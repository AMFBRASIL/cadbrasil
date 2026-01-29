import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { getConnection, query } from "../db.js";
import { gerarProtocoloCadbrasil } from "../utils/protocolo.js";
import { enviarEmailCadastro, enviarEmailNotificacao, enviarEmailContato } from "../services/email.js";
import { gerarBoleto, gerarPix, diagnosticoPix, diagnosticoPixCob, consultarPix, diagnosticoBoleto } from "../services/gerencianet.js";

const router = Router();

function strip(value) {
  if (value == null || typeof value !== "string") return null;
  return value.replace(/\D/g, "").trim() || null;
}

function str(value) {
  if (value == null || typeof value !== "string") return null;
  const s = value.trim();
  return s || null;
}

/** Normaliza vencimento para YYYY-MM-DD (Gerencianet). Aceita dd/mm/yyyy ou YYYY-MM-DD. */
function parseVencimento(value) {
  if (!value || typeof value !== "string") return null;
  const s = value.trim();
  const dmY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (dmY) {
    const [, d, m, y] = dmY;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const ymd = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (ymd) return s;
  return null;
}

router.post("/cadastro", async (req, res) => {
  try {
    const body = req.body || {};

    const tipoPessoa = body.tipoPessoa === "cpf" ? "cpf" : body.tipoPessoa === "cnpj" ? "cnpj" : null;
    const documento = str(body.cnpj); // Pode ser CPF ou CNPJ (com formatação)
    const documentoLimpo = strip(documento); // Apenas para validação
    const isCPF = tipoPessoa === "cpf" || (documentoLimpo && documentoLimpo.length === 11);
    const isCNPJ = tipoPessoa === "cnpj" || (documentoLimpo && documentoLimpo.length === 14);
    
    const razaoSocial = str(body.razaoSocial);
    const nomeFantasia = str(body.nomeFantasia) || null;
    const cnae = str(body.cnae) || null;
    const cep = str(body.cep);
    const logradouro = str(body.logradouro) || null;
    const numero = str(body.numero) || null;
    const complemento = str(body.complemento) || null;
    const bairro = str(body.bairro) || null;
    const cidade = str(body.cidade) || null;
    const uf = str(body.uf) || null;

    const nomeResponsavel = str(body.nomeResponsavel);
    const cpfResponsavel = strip(body.cpfResponsavel);
    const cargoResponsavel = str(body.cargoResponsavel) || null;
    const telefoneResponsavel = str(body.telefoneResponsavel) || null;
    const emailResponsavel = str(body.emailResponsavel);

    const tipoServico = body.tipoServico === "renovacao" ? "renovacao" : "novo";
    const segmentoAtuacao = str(body.segmentoAtuacao) || null;
    const objetivoLicitacao = str(body.objetivoLicitacao) || null;

    const emailAcesso = str(body.emailAcesso) || emailResponsavel;
    const senha = str(body.senha);
    const aceitaNotificacoes = !!body.aceitaNotificacoes;

    if (!tipoPessoa) {
      return res.status(400).json({ 
        success: false, 
        error: "Tipo de pessoa não selecionado. Selecione Pessoa Física (CPF) ou Pessoa Jurídica (CNPJ)." 
      });
    }
    
    if (!documento || (!isCPF && !isCNPJ)) {
      return res.status(400).json({ 
        success: false, 
        error: isCPF ? "CPF inválido." : isCNPJ ? "CNPJ inválido." : "CPF ou CNPJ inválido." 
      });
    }
    if (!razaoSocial) {
      return res.status(400).json({ success: false, error: "Razão social é obrigatória." });
    }
    if (!nomeResponsavel) {
      return res.status(400).json({ success: false, error: "Nome do responsável é obrigatório." });
    }
    if (!emailResponsavel) {
      return res.status(400).json({ success: false, error: "E-mail do responsável é obrigatório." });
    }
    if (!emailAcesso) {
      return res.status(400).json({ success: false, error: "E-mail de acesso é obrigatório." });
    }
    if (!senha || senha.length < 6) {
      return res.status(400).json({ success: false, error: "Senha deve ter no mínimo 6 caracteres." });
    }

    const conn = await getConnection();

    try {
      await conn.beginTransaction();

      const [existing] = await conn.execute(
        "SELECT IdUsuario FROM tbl_smart_usuarios WHERE Email = ? LIMIT 1",
        [emailAcesso]
      );
      if (existing.length > 0) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          error: "Já existe cadastro com este e-mail de acesso. Use outro e-mail ou recupere o acesso.",
        });
      }

      const ukMail = randomUUID();
      const senhaHash = await bcrypt.hash(senha, 10);
      const now = new Date();
      const dataCadastro = now.toISOString().slice(0, 19).replace("T", " ");

      // 1. Primeiro: Inserir em tbl_smart_usuarios
      const [resultUsuario] = await conn.execute(
        `INSERT INTO tbl_smart_usuarios (
          IdGrupo, IdStatus, IdSistema, Nome, Contato, Email, Senha, Telefone, CellPhone,
          DataCadastro, ukMail
        ) VALUES (?, 4, 2, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          null,
          nomeResponsavel,
          nomeResponsavel,
          emailAcesso,
          senhaHash,
          telefoneResponsavel || null,
          telefoneResponsavel || null,
          dataCadastro,
          ukMail,
        ]
      );

      // 2. Obter o IdUsuario gerado automaticamente (LAST_INSERT_ID)
      const IdUsuario = resultUsuario.insertId;
      if (!IdUsuario) {
        await conn.rollback();
        return res.status(500).json({ success: false, error: "Erro ao obter ID do usuário criado." });
      }

      // 3. Preparar dados para tbl_smart_clientes
      const protocolo = gerarProtocoloCadbrasil();
      const cpfLimpo = cpfResponsavel ? strip(cpfResponsavel) : null;
      const cepLimpo = cep ? strip(cep) : null;
      const segmento = [segmentoAtuacao, objetivoLicitacao].filter(Boolean).join(" | ") || null;
      const idTipoCadastro = tipoServico === "renovacao" ? 2 : 1;
      const dataCriada = dataCadastro;
      const ukId = randomUUID();
      const sendEmail = aceitaNotificacoes ? 1 : 0;

      // 4. Segundo: Inserir em tbl_smart_clientes usando o IdUsuario obtido acima
      // IdTipoCliente: 3 = Pessoa Física, 4 = Pessoa Jurídica
      const idTipoCliente = isCPF ? 3 : 4; // 3 = CPF, 4 = CNPJ
      
      // Salvar documento COM formatação (pontos, hífens, barras)
      const documentoFormatado = documento; // Manter formatação original
      
      const [resultCliente] = await conn.execute(
        `INSERT INTO tbl_smart_clientes (
          IdTipoCliente, IdUsuario, IdTipoCadastro, IdSistema,
          RazaoSocial, NomeFantasia, Cnpjcpf, NomeResponsavel, EmailResponsavel, CpfResponsavel,
          Cargo, Cep, Endereco, Numero, ComplementoEndereco, Bairro, Cidade, Estado,
          Email, TelefoneCelular, TelefoneComercial, CodeCnae, AtividadeEmpresa,
          SegmentoComplementar, DataCriada, ukId, ProtocoloCadbrasil, SendEMAIL, SendSMS, sourcePage
        ) VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
        [
          idTipoCliente,
          IdUsuario,
          idTipoCadastro,
          razaoSocial,
          nomeFantasia,
          documentoFormatado,
          nomeResponsavel,
          emailResponsavel,
          cpfLimpo,
          cargoResponsavel,
          cepLimpo,
          logradouro,
          numero,
          complemento,
          bairro,
          cidade,
          uf,
          emailResponsavel,
          telefoneResponsavel,
          telefoneResponsavel,
          cnae,
          cnae,
          segmento,
          dataCriada,
          ukId,
          protocolo,
          sendEmail,
          "cadastro",
        ]
      );

      // 5. Obter o IdCliente gerado automaticamente (LAST_INSERT_ID)
      const IdCliente = resultCliente.insertId;

      // 6. Criar pedido em tbl_smart_pedido_credenciamento
      const dataPedido = now.toISOString().slice(0, 19).replace("T", " ");
      const ukPedido = randomUUID();
      
      // Valores padrão baseados na estrutura da tabela
      const idPlano = 47; // Valor padrão da tabela
      const idFormaPagamento = 1; // Valor padrão da tabela
      const idStatus = 16; // Valor padrão da tabela
      const idStatusVerf = 32; // Valor padrão da tabela
      
      const [resultPedido] = await conn.execute(
        `INSERT INTO tbl_smart_pedido_credenciamento (
          IdCliente, IdUsuario, IdPlano, IdFormaPagamento, IdStatus, IdStatusVerf,
          DataPedido, uk_pedido
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          IdCliente,
          IdUsuario,
          idPlano,
          idFormaPagamento,
          idStatus,
          idStatusVerf,
          dataPedido,
          ukPedido,
        ]
      );

      const IdPedido = resultPedido.insertId;

      await conn.commit();

      // Enviar email de confirmação (não bloqueia a resposta)
      enviarEmailCadastro({
        emailResponsavel,
        nomeResponsavel,
        razaoSocial,
        protocolo,
        tipoServico,
        cnpj: documentoFormatado, // Usar formato completo para exibição no email
      }).catch((emailError) => {
        console.error("[POST /api/cadastro] Erro ao enviar email:", emailError);
        // Não falha o cadastro se o email falhar
      });

      // Enviar email de notificação interna (opcional, não bloqueia)
      enviarEmailNotificacao({
        razaoSocial,
        cnpj: documentoFormatado, // Usar formato completo para exibição no email
        protocolo,
        tipoServico,
        emailResponsavel,
      }).catch((emailError) => {
        console.error("[POST /api/cadastro] Erro ao enviar notificação:", emailError);
      });

      return res.status(201).json({
        success: true,
        protocolo,
        idUsuario: IdUsuario,
        idCliente: IdCliente,
        idPedido: IdPedido,
      });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("[POST /api/cadastro]", err);
    
    // Tratamento específico para erros de MySQL
    if (err.code === "ER_ACCESS_DENIED_ERROR" || err.code === "ECONNREFUSED") {
      return res.status(500).json({
        success: false,
        error: "Erro de conexão com o banco de dados. Verifique as credenciais e permissões do usuário MySQL.",
        details: process.env.NODE_ENV === "development" ? {
          code: err.code,
          message: err.message,
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
        } : undefined,
      });
    }
    
    const msg = process.env.NODE_ENV === "development" ? err.message : "Erro ao processar cadastro.";
    return res.status(500).json({ success: false, error: msg });
  }
});

// Mapeia resposta da API CNPJ.ws (comercial.cnpj.ws) para o formato esperado pelo frontend
// Documentação: https://docs.cnpj.ws/blog/consultar-cnpj-javascript
function mapCnpjWsToFrontend(raw) {
  const est = raw.estabelecimento || {};
  const tipoLog = (est.tipo_logradouro || "").trim();
  const logr = (est.logradouro || "").trim();
  const logradouroCompleto = [tipoLog, logr].filter(Boolean).join(" ") || "";
  const ativ = est.atividade_principal || {};
  const cep = est.cep ? String(est.cep).replace(/\D/g, "") : "";
  const cepFormatado = cep.length === 8 ? cep.replace(/^(\d{5})(\d{3})$/, "$1-$2") : cep;

  return {
    nome: raw.razao_social || "",
    fantasia: est.nome_fantasia || "",
    cep: cepFormatado,
    logradouro: logradouroCompleto,
    numero: est.numero || "",
    complemento: est.complemento || "",
    bairro: est.bairro || "",
    municipio: (est.cidade && est.cidade.nome) || "",
    uf: (est.estado && est.estado.sigla) || "",
    atividade_principal: [
      {
        text: ativ.descricao || "",
        code: ativ.id || "",
      },
    ],
  };
}

// Endpoint para buscar dados do CNPJ (proxy para evitar CORS)
// Usa a API CNPJ.ws: https://comercial.cnpj.ws/cnpj/{CNPJ} (header x_api_token)
// Documentação: https://docs.cnpj.ws/blog/consultar-cnpj-javascript
router.get("/cnpj/:cnpj", async (req, res) => {
  try {
    const cnpj = req.params.cnpj.replace(/\D/g, "");
    let apiToken = (process.env.CNPJ_WS_API_TOKEN || process.env.RECEITAWS_API_TOKEN || "").trim();
    apiToken = apiToken.replace(/^["']|["']$/g, ""); // remove aspas do .env

    if (cnpj.length !== 14) {
      return res.status(400).json({ success: false, error: "CNPJ deve ter 14 dígitos." });
    }

    if (!apiToken || apiToken === "123") {
      return res.status(401).json({
        success: false,
        error: "Token da API CNPJ.ws não configurado. Configure CNPJ_WS_API_TOKEN no .env com o token recebido do CNPJ.ws (não use o token da ReceitaWS).",
      });
    }

    // Documentação: header x_api_token ou query ?token= (https://docs.cnpj.ws/referencia-de-api/api-comercial/consultando-raiz-cnpj)
    const url = `https://comercial.cnpj.ws/cnpj/${cnpj}?token=${encodeURIComponent(apiToken)}`;
    const headers = {
      "Accept": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "x_api_token": apiToken,
    };

    console.log(`[GET /api/cnpj/:cnpj] Buscando CNPJ: ${cnpj}`);
    console.log(`[GET /api/cnpj/:cnpj] URL: ${url}`);
    console.log(`[GET /api/cnpj/:cnpj] Token presente: ${apiToken ? "Sim" : "Não"}`);

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    console.log(`[GET /api/cnpj/:cnpj] Status: ${response.status} ${response.statusText}`);

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      if (!response.ok) {
        return res.status(response.status).json({
          success: false,
          error: responseText || `Erro ${response.status}: ${response.statusText}`,
        });
      }
      return res.status(500).json({
        success: false,
        error: "Resposta inválida da API CNPJ.ws.",
      });
    }

    if (!response.ok) {
      const errorMessage = data.message || data.error || data.resultado_txt || data.detail || `Erro ${response.status}: ${response.statusText}`;
      console.error(`[GET /api/cnpj/:cnpj] Erro ${response.status}:`, { message: errorMessage, cnpj });
      return res.status(response.status).json({
        success: false,
        error: typeof errorMessage === "string" ? errorMessage : "CNPJ não encontrado ou inválido.",
        details: process.env.NODE_ENV === "development" ? data : undefined,
      });
    }

    // CNPJ.ws pode retornar resultado=0 em corpo JSON
    if (data.resultado === 0 || data.resultado === "0") {
      const msg = data.resultado_txt || "CNPJ não encontrado ou inválido.";
      return res.status(404).json({ success: false, error: msg });
    }

    // Resposta válida: mapear para o formato esperado pelo frontend
    const normalized = mapCnpjWsToFrontend(data);
    return res.json({ success: true, data: normalized });
  } catch (err) {
    console.error("[GET /api/cnpj/:cnpj]", err);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : "Erro ao buscar CNPJ.",
    });
  }
});

// Endpoint para verificar se cliente existe e pode renovar
router.post("/renovacao/verificar", async (req, res) => {
  try {
    const { documento, tipoPessoa } = req.body;
    
    if (!documento || !tipoPessoa) {
      return res.status(400).json({
        success: false,
        error: "Documento e tipo de pessoa são obrigatórios",
      });
    }

    const documentoLimpo = documento.replace(/\D/g, "");
    const isCPF = tipoPessoa === "cpf";
    const isCNPJ = tipoPessoa === "cnpj";

    if ((isCPF && documentoLimpo.length !== 11) || (isCNPJ && documentoLimpo.length !== 14)) {
      return res.status(400).json({
        success: false,
        error: isCPF ? "CPF inválido" : "CNPJ inválido",
      });
    }

    const conn = await getConnection();

    try {
      // Buscar cliente na tabela tbl_smart_clientes pelo CPF/CNPJ
      // Buscar tanto com formatação quanto sem (pode estar salvo de ambas as formas)
      // Buscar também o email através do IdUsuario relacionado
      const [clientes] = await conn.execute(
        `SELECT 
           c.IdCliente, 
           c.Cnpjcpf,
           c.IdUsuario,
           u.Email
         FROM tbl_smart_clientes c
         LEFT JOIN tbl_smart_usuarios u ON c.IdUsuario = u.IdUsuario
         WHERE REPLACE(REPLACE(REPLACE(REPLACE(c.Cnpjcpf, '.', ''), '/', ''), '-', ''), ' ', '') = ? 
         LIMIT 1`,
        [documentoLimpo]
      );

      // Se encontrar pelo menos 1 registro, pode renovar (acessar plataforma)
      const podeRenovar = clientes.length > 0;

      return res.json({
        success: true,
        existe: podeRenovar,
        podeRenovar,
        idCliente: podeRenovar ? clientes[0].IdCliente : null,
        email: podeRenovar ? (clientes[0].Email || null) : null,
      });
    } catch (err) {
      console.error("[POST /api/renovacao/verificar]", err);
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    console.error("[POST /api/renovacao/verificar]", err);
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === "development" ? err.message : "Erro ao verificar cliente.",
    });
  }
});

// Endpoint para verificar pagamento PIX via Gerencianet (pixDetailCharge por txid)
router.post("/pagamento/verificar", async (req, res) => {
  try {
    const { idPedido, txid, protocolo } = req.body;

    if (!txid || typeof txid !== "string" || !txid.trim()) {
      return res.status(400).json({
        success: false,
        error: "txid do PIX é obrigatório para verificação.",
      });
    }

    const conn = await getConnection();

    try {
      const resposta = await consultarPix(txid.trim());
      const pago = Array.isArray(resposta?.pix) && resposta.pix.length > 0;

      if (pago && idPedido) {
        await conn.execute(
          `UPDATE tbl_smart_pedido_credenciamento 
           SET DataAtualizadoFinanceiro = NOW(), IdStatus = 14 
           WHERE IdPedido = ?`,
          [idPedido]
        );
      }

      conn.release();

      return res.json({
        success: true,
        pago,
        mensagem: pago
          ? "Pagamento confirmado com sucesso!"
          : "Pagamento ainda não identificado. Aguarde alguns minutos e tente novamente.",
      });
    } catch (apiErr) {
      conn.release();
      throw apiErr;
    }
  } catch (err) {
    console.error("[POST /api/pagamento/verificar]", err);
    const msg = err?.message || "Erro ao verificar pagamento.";
    return res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === "development" ? msg : "Erro ao verificar pagamento. Tente novamente.",
    });
  }
});

// Endpoint para gerar boleto via Gerencianet
router.post("/pagamento/gerar-boleto", async (req, res) => {
  try {
    const { idPedido, protocolo, valor, vencimento, cliente } = req.body;

    if (!idPedido || !protocolo || !valor || !vencimento || !cliente) {
      return res.status(400).json({
        success: false,
        error: "Dados incompletos. São necessários: idPedido, protocolo, valor, vencimento e cliente.",
      });
    }

    const conn = await getConnection();

    try {
      // Verificar se o pedido existe
      const [pedidos] = await conn.execute(
        `SELECT p.IdPedido, p.IdCliente, c.RazaoSocial, c.Cnpjcpf, c.Email, c.NomeResponsavel
         FROM tbl_smart_pedido_credenciamento p
         INNER JOIN tbl_smart_clientes c ON p.IdCliente = c.IdCliente
         WHERE p.IdPedido = ?`,
        [idPedido]
      );

      if (pedidos.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Pedido não encontrado.",
        });
      }

      const pedido = pedidos[0];

      // Boleto: dados da EMPRESA (CNPJ + Razão Social), não do responsável
      const cnpjVal = cliente.cnpj || (pedido.Cnpjcpf ? String(pedido.Cnpjcpf).replace(/\D/g, "") : null);
      const razaoVal = pedido.RazaoSocial || cliente.razaoSocial || "";
      const clienteData = {
        nome: cnpjVal ? razaoVal : (cliente.nome || pedido.NomeResponsavel || pedido.RazaoSocial),
        razaoSocial: razaoVal,
        email: cliente.email || pedido.Email,
        telefone: cliente.telefone || null,
        cpf: cnpjVal ? null : (cliente.cpf || null),
        cnpj: cnpjVal || null,
        endereco: cliente.endereco || null,
      };

      // Converter valor para centavos
      const valorCentavos = Math.round(parseFloat(valor) * 100);

      // Vencimento em YYYY-MM-DD (ex.: 2026-02-26). Aceita dd/mm/yyyy ou YYYY-MM-DD.
      const vencimentoFormatado = parseVencimento(vencimento);
      if (!vencimentoFormatado) {
        return res.status(400).json({
          success: false,
          error: "Data de vencimento inválida. Use dd/mm/yyyy ou YYYY-MM-DD.",
        });
      }

      // Idempotência: reutilizar boleto já criado para este IdPedido + valor (evita "3 cobranças idênticas")
      const [existentes] = await conn.execute(
        `SELECT GerencianetChargeId, BoletoLink, BoletoPdf, BoletoBarcode
         FROM tbl_smart_boleto
         WHERE IdPedido = ? AND ValorCentavos = ?`,
        [idPedido, valorCentavos]
      );

      if (existentes.length > 0) {
        const row = existentes[0];
        conn.release();
        return res.json({
          success: true,
          charge_id: row.GerencianetChargeId,
          boleto: {
            barcode: row.BoletoBarcode || null,
            link: row.BoletoLink,
            pdf: row.BoletoPdf || null,
            expire_at: null,
            linha_digitavel: null,
          },
        });
      }

      // Gerar boleto via Gerencianet (one-step)
      const boletoResponse = await gerarBoleto({
        valor: valorCentavos,
        vencimento: vencimentoFormatado,
        cliente: clienteData,
        protocolo: protocolo,
        idPedido: idPedido,
      });

      const chargeId = boletoResponse.data.charge_id;
      const link = boletoResponse.data.link || "";
      const pdf = boletoResponse.data.pdf?.charge || null;
      const barcode = boletoResponse.data.barcode || null;

      // Persistir para idempotência
      await conn.execute(
        `INSERT INTO tbl_smart_boleto (IdPedido, ValorCentavos, GerencianetChargeId, BoletoLink, BoletoPdf, BoletoBarcode)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           GerencianetChargeId = VALUES(GerencianetChargeId),
           BoletoLink = VALUES(BoletoLink),
           BoletoPdf = VALUES(BoletoPdf),
           BoletoBarcode = VALUES(BoletoBarcode),
           CreatedAt = CURRENT_TIMESTAMP`,
        [idPedido, valorCentavos, chargeId, link, pdf, barcode]
      );

      // Atualizar pedido com vencimento
      await conn.execute(
        `UPDATE tbl_smart_pedido_credenciamento 
         SET DataVencimento = ?
         WHERE IdPedido = ?`,
        [vencimentoFormatado, idPedido]
      );

      conn.release();

      return res.json({
        success: true,
        charge_id: chargeId,
        boleto: {
          barcode,
          link,
          pdf,
          expire_at: boletoResponse.data.expire_at,
          linha_digitavel: boletoResponse.data.pixCopyPaste || null,
        },
      });
    } catch (err) {
      conn.release();
      throw err;
    }
  } catch (err) {
    const msg = err?.message || "Erro ao gerar boleto.";
    console.error("[POST /api/pagamento/gerar-boleto]", msg, err?.raw ?? err);
    const payload = {
      success: false,
      error: msg,
    };
    if (process.env.NODE_ENV === "development" && err?.raw != null) {
      try {
        payload.raw = typeof err.raw === "object" ? err.raw : { value: String(err.raw) };
      } catch (_) {}
    }
    return res.status(500).json(payload);
  }
});

// Endpoint para gerar PIX via Gerencianet
router.post("/pagamento/gerar-pix", async (req, res) => {
  try {
    const { idPedido, protocolo, valor, cliente } = req.body;

    if (!idPedido || !protocolo || !valor || !cliente) {
      return res.status(400).json({
        success: false,
        error: "Dados incompletos. São necessários: idPedido, protocolo, valor e cliente.",
      });
    }

    const conn = await getConnection();

    try {
      // Verificar se o pedido existe
      const [pedidos] = await conn.execute(
        `SELECT p.IdPedido, p.IdCliente, c.RazaoSocial, c.Cnpjcpf, c.Email, c.NomeResponsavel
         FROM tbl_smart_pedido_credenciamento p
         INNER JOIN tbl_smart_clientes c ON p.IdCliente = c.IdCliente
         WHERE p.IdPedido = ?`,
        [idPedido]
      );

      if (pedidos.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Pedido não encontrado.",
        });
      }

      const pedido = pedidos[0];

      // Preparar dados do cliente para Gerencianet
      const clienteData = {
        nome: cliente.nome || pedido.NomeResponsavel || pedido.RazaoSocial,
        razaoSocial: pedido.RazaoSocial,
        email: cliente.email || pedido.Email,
        telefone: cliente.telefone || null,
        cpf: cliente.cpf || null,
        cnpj: cliente.cnpj || (pedido.Cnpjcpf ? pedido.Cnpjcpf.replace(/\D/g, "") : null),
      };

      // Converter valor para centavos
      const valorCentavos = Math.round(parseFloat(valor) * 100);

      // Gerar PIX via Gerencianet
      const pixResponse = await gerarPix({
        valor: valorCentavos,
        cliente: clienteData,
        protocolo: protocolo,
        idPedido: idPedido,
      });

      // Atualizar pedido com informações do PIX
      await conn.execute(
        `UPDATE tbl_smart_pedido_credenciamento 
         SET DataAtualizadoFinanceiro = NOW()
         WHERE IdPedido = ?`,
        [idPedido]
      );

      conn.release();

      return res.json({
        success: true,
        txid: pixResponse.txid,
        pix: {
          qrcode: pixResponse.qrcode?.qrcode || null,
          qrcode_image: pixResponse.qrcode?.imagemQrcode || null,
          copy_paste: pixResponse.qrcode?.qrcode || null,
        },
      });
    } catch (err) {
      conn.release();
      throw err;
    }
  } catch (err) {
    console.error("[POST /api/pagamento/gerar-pix]", err);
    const msg = err?.message || "Erro ao gerar PIX.";
    const payload = {
      success: false,
      error: process.env.NODE_ENV === "development" ? msg : "Erro ao gerar PIX. Verifique certificado, chave PIX e credenciais Gerencianet.",
    };
    if (process.env.NODE_ENV === "development" && err?.raw != null) {
      try {
        payload.raw = typeof err.raw === "object" ? err.raw : { value: String(err.raw) };
      } catch (_) {}
    }
    return res.status(500).json(payload);
  }
});

// Diagnóstico boleto — tenta criar cobrança mínima para debugar em produção
router.get("/pagamento/diagnostico-boleto", async (_req, res) => {
  try {
    const result = await diagnosticoBoleto();
    return res.json(result);
  } catch (err) {
    console.error("[GET /api/pagamento/diagnostico-boleto]", err);
    return res.status(500).json({
      ok: false,
      error: err?.message || "Erro no diagnóstico boleto.",
    });
  }
});

// Diagnóstico Gerencianet PIX (OAuth apenas) — ajuda a debugar Forbidden
router.get("/gerencianet/diagnostico", async (_req, res) => {
  try {
    const result = await diagnosticoPix();
    return res.json(result);
  } catch (err) {
    console.error("[GET /api/gerencianet/diagnostico]", err);
    return res.status(500).json({
      ok: false,
      step: "oauth",
      error: err?.message || "Erro no diagnóstico.",
      raw: process.env.NODE_ENV === "development" && err ? { message: err.message } : undefined,
    });
  }
});

// Diagnóstico PIX + POST /v2/cob (OAuth + cobrança imediata) — ajuda a debugar 404
router.get("/gerencianet/diagnostico-cob", async (_req, res) => {
  try {
    const result = await diagnosticoPixCob();
    return res.json(result);
  } catch (err) {
    console.error("[GET /api/gerencianet/diagnostico-cob]", err);
    return res.status(500).json({
      oauthOk: false,
      cobStatus: null,
      cobResponse: null,
      request: null,
      error: err?.message || "Erro no diagnóstico.",
    });
  }
});

// Formulário de contato (página /contato) — envia para send.cadbr.com.br
router.post("/contato", async (req, res) => {
  try {
    const body = req.body || {};
    const nome = str(body.nome);
    const email = str(body.email);
    const telefone = str(body.telefone) || null;
    const empresa = str(body.empresa) || null;
    const assunto = str(body.assunto);
    const mensagem = str(body.mensagem);

    if (!nome || !email || !assunto || !mensagem) {
      return res.status(400).json({
        success: false,
        error: "Preencha nome, e-mail, assunto e mensagem.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "E-mail inválido.",
      });
    }

    await enviarEmailContato({
      nome,
      email,
      telefone: telefone || "",
      empresa: empresa || "",
      assunto,
      mensagem,
    });

    return res.json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (err) {
    console.error("[POST /api/contato]", err);
    const msg = err?.message || "Erro ao enviar mensagem. Tente novamente.";
    return res.status(500).json({ success: false, error: msg });
  }
});

export default router;

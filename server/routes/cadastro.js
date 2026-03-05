import { Router } from "express";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { getConnection } from "../db.js";
import { gerarProtocoloCadbrasil } from "../utils/protocolo.js";
import { enviarEmailCadastro, enviarEmailNotificacao, enviarEmailContato } from "../services/email.js";
import { gerarBoleto, gerarPix, diagnosticoPix, diagnosticoPixCob, consultarPix, diagnosticoBoleto } from "../services/gerencianet.js";
import { uploadOfflineConversion, formatConversionDateTime } from "../services/google-ads-conversion.js";

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

function getAvatarIniciais(nome) {
  if (!nome || typeof nome !== "string") return null;
  const parts = nome.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatDateOnly(date) {
  return date.toISOString().slice(0, 10);
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

    // Tracking UTM (Google Ads / campanhas)
    const utmSource = str(body.utm_source) || null;
    const utmMedium = str(body.utm_medium) || null;
    const utmCampaign = str(body.utm_campaign) || null;
    const utmTerm = str(body.utm_term) || null;
    const utmContent = str(body.utm_content) || null;
    const gclid = str(body.gclid) || null;
    const gbraid = str(body.gbraid) || null;
    const gadSource = str(body.gad_source) || null;
    const gadCampaignId = str(body.gad_campaignid) || null;
    const landingPage = str(body.landing_page) || null;
    const referrer = str(body.referrer) || null;

    console.log("[POST /api/cadastro] UTM recebido do frontend:", {
      utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign,
      utm_term: utmTerm, utm_content: utmContent, gclid, gbraid, gad_source: gadSource,
      gad_campaignid: gadCampaignId, landing_page: landingPage, referrer
    });

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
    let protocolo = null;
    let idUsuario = null;
    let idCliente = null;
    let idContrato = null;
    let templateBoasVindas = null;
    let configuracoesEmailEmpresa = [];

    try {
      await conn.beginTransaction();

      // 1) Leitura inicial: validar documento já cadastrado em clientes
      const [existingCliente] = await conn.execute(
        `SELECT id
         FROM clientes
         WHERE REPLACE(REPLACE(REPLACE(REPLACE(documento, '.', ''), '/', ''), '-', ''), ' ', '') = ?
         LIMIT 1`,
        [documentoLimpo]
      );
      if (existingCliente.length > 0) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          error: "Já existe cliente com este CPF/CNPJ.",
        });
      }

      const [existingUser] = await conn.execute(
        "SELECT id FROM usuarios WHERE email = ? LIMIT 1",
        [emailAcesso]
      );
      if (existingUser.length > 0) {
        await conn.rollback();
        return res.status(409).json({
          success: false,
          error: "Já existe cadastro com este e-mail de acesso. Use outro e-mail ou recupere o acesso.",
        });
      }

      const [perfilRows] = await conn.execute(
        "SELECT id FROM perfis_acesso WHERE tipo = 'cliente' AND ativo = 1 ORDER BY id ASC LIMIT 1"
      );
      if (perfilRows.length === 0) {
        await conn.rollback();
        return res.status(500).json({
          success: false,
          error: "Perfil de acesso do cliente não configurado na base nova.",
        });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const now = new Date();
      const today = formatDateOnly(now);
      const nextYear = new Date(now);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      const vencimentoContrato = formatDateOnly(nextYear);
      const avatarIniciais = getAvatarIniciais(nomeResponsavel);
      const protocoloCadastro = gerarProtocoloCadbrasil();
      // Persistir exatamente como veio do formulário (com máscara)
      const documentoFormatado = documento;
      const enderecoCompleto = [logradouro, numero, complemento].filter(Boolean).join(", ") || null;
      const observacoesCliente = [
        `Protocolo: ${protocoloCadastro}`,
        `Origem: site`,
        tipoServico ? `Tipo serviço: ${tipoServico}` : null,
        [segmentoAtuacao, objetivoLicitacao].filter(Boolean).join(" | ") || null,
      ].filter(Boolean).join(" | ");

      // Usuário para satisfazer FK de clientes.usuario_id
      const [resultUsuario] = await conn.execute(
        `INSERT INTO usuarios (
          nome, email, senha_hash, telefone, avatar_iniciais, departamento, perfil_id, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Ativo')`,
        [
          nomeResponsavel,
          emailAcesso,
          senhaHash,
          telefoneResponsavel || null,
          avatarIniciais,
          "Portal Cliente",
          perfilRows[0].id,
        ]
      );
      idUsuario = resultUsuario.insertId;

      // 2) INSERT clientes
      const [resultCliente] = await conn.execute(
        `INSERT INTO clientes (
          usuario_id, tipo_documento, documento, razao_social, nome_fantasia,
          email, telefone, celular, endereco, cidade, estado, cep,
          ramo_atividade, responsavel_nome, responsavel_cpf, responsavel_email, responsavel_telefone,
          status, observacoes, ProtocoloCadbrasil
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pendente', ?, ?)`,
        [
          idUsuario,
          isCPF ? "CPF" : "CNPJ",
          documentoFormatado,
          razaoSocial,
          nomeFantasia,
          emailResponsavel,
          telefoneResponsavel,
          telefoneResponsavel,
          enderecoCompleto,
          cidade,
          uf,
          cep,
          cnae,
          nomeResponsavel,
          cpfResponsavel,
          emailResponsavel,
          telefoneResponsavel,
          observacoesCliente || null,
          protocoloCadastro,
        ]
      );
      idCliente = resultCliente.insertId;

      // 3) INSERT sicaf_cadastros (status inicial Pendente)
      const [resultSicaf] = await conn.execute(
        `INSERT INTO sicaf_cadastros (
          cliente_id, status, completude, credenciamento_anual, manutencao_ativa, dias_validade, observacoes
        ) VALUES (?, 'Pendente', 0.00, 0, 0, 0, ?)`,
        [idCliente, "Cadastro inicial via site CADBRASIL"]
      );
      const idSicaf = resultSicaf.insertId;

      // 4) INSERT sicaf_niveis (nível I desabilitado)
      await conn.execute(
        "INSERT INTO sicaf_niveis (sicaf_id, nivel, habilitado) VALUES (?, 'I', 0)",
        [idSicaf]
      );

      // 5) INSERT opcional em cliente_contatos
      if (nomeResponsavel) {
        try {
          // Tenta estrutura completa (bases que possuem coluna cpf)
          await conn.execute(
            `INSERT INTO cliente_contatos (cliente_id, nome, cpf, cargo, email, telefone, principal)
             VALUES (?, ?, ?, ?, ?, ?, 1)`,
            [idCliente, nomeResponsavel, cpfResponsavel, cargoResponsavel, emailResponsavel, telefoneResponsavel]
          );
        } catch (contactErr) {
          if (contactErr?.code !== "ER_BAD_FIELD_ERROR") {
            throw contactErr;
          }
          // Fallback para bases onde a coluna cpf ainda não existe
          await conn.execute(
            `INSERT INTO cliente_contatos (cliente_id, nome, cargo, email, telefone, principal)
             VALUES (?, ?, ?, ?, ?, 1)`,
            [idCliente, nomeResponsavel, cargoResponsavel, emailResponsavel, telefoneResponsavel]
          );
        }
      }

      // 6) INSERT contratos_digitais (plano padrão e status Assinado)
      const [resultContrato] = await conn.execute(
        `INSERT INTO contratos_digitais (
          cliente_id, plano, data_inicio, data_vencimento, status, assinado_em, assinado_por, ip_assinatura, observacoes
        ) VALUES (?, 'Licença + Manutenção', ?, ?, 'Assinado', NOW(), ?, ?, ?)`,
        [
          idCliente,
          today,
          vencimentoContrato,
          nomeResponsavel,
          req.ip || null,
          `Contrato criado automaticamente no cadastro. ${protocoloCadastro}`,
        ]
      );
      idContrato = resultContrato.insertId;
      protocolo = protocoloCadastro;

      // Tracking Google Ads na base nova (não bloqueante)
      try {
        await conn.execute(
          `INSERT INTO tracking_sessoes (
            session_id, cliente_id, usuario_id, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
            gclid, gbraid, gad_source, landing_page, referrer, user_agent, converted, conversion_type, conversion_at,
            funnel_step, last_activity_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'signup', NOW(), 'signup', NOW())`,
          [
            randomUUID(),
            idCliente,
            idUsuario,
            utmSource,
            utmMedium,
            utmCampaign || gadCampaignId || null,
            utmTerm,
            utmContent,
            gclid,
            gbraid,
            gadSource,
            landingPage,
            referrer,
            req.get("user-agent") || null,
          ]
        );
      } catch (trackingErr) {
        console.warn("[POST /api/cadastro] Falha ao gravar tracking_sessoes:", trackingErr.message);
      }

      await conn.commit();

      // 7) SELECT template ativo de boas-vindas
      try {
        const [templateRows] = await conn.execute(
          `SELECT id, nome, assunto, corpo_html
           FROM templates_email
           WHERE ativo = 1 AND nome LIKE 'Bem-vindo%'
           ORDER BY id ASC
           LIMIT 1`
        );
        templateBoasVindas = templateRows[0] || null;
      } catch (templateErr) {
        console.warn("[POST /api/cadastro] Falha ao buscar templates_email:", templateErr.message);
      }

      // 8) SELECT configurações SMTP e dados da empresa
      try {
        const [configRows] = await conn.execute(
          `SELECT chave, valor
           FROM configuracoes_sistema
           WHERE categoria IN ('email', 'empresa')`
        );
        configuracoesEmailEmpresa = configRows || [];
      } catch (configErr) {
        console.warn("[POST /api/cadastro] Falha ao buscar configuracoes_sistema:", configErr.message);
      }

      // Envio de email (não bloqueante)
      enviarEmailCadastro({
        emailResponsavel,
        nomeResponsavel,
        razaoSocial,
        protocolo,
        tipoServico,
        template: templateBoasVindas,
        configuracoes: configuracoesEmailEmpresa,
      }).catch((emailError) => {
        console.error("[POST /api/cadastro] Erro ao enviar email:", emailError);
      });

      if (aceitaNotificacoes) {
        enviarEmailNotificacao({
          razaoSocial,
          cnpj: documento,
          protocolo,
          tipoServico,
          emailResponsavel,
        }).catch((emailError) => {
          console.error("[POST /api/cadastro] Erro ao enviar notificação:", emailError);
        });
      }

      return res.status(201).json({
        success: true,
        protocolo,
        idUsuario: idUsuario,
        idCliente: idCliente,
        idPedido: idContrato,
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

    if (cnpj.length !== 14) {
      return res.status(400).json({ success: false, error: "CNPJ deve ter 14 dígitos." });
    }

    // Prioridade: buscar no banco novo primeiro
    try {
      const conn = await getConnection();
      try {
        const [clientes] = await conn.execute(
          `SELECT razao_social, nome_fantasia, cep, endereco, cidade, estado, ramo_atividade
           FROM clientes
           WHERE tipo_documento = 'CNPJ'
             AND REPLACE(REPLACE(REPLACE(REPLACE(documento, '.', ''), '/', ''), '-', ''), ' ', '') = ?
           LIMIT 1`,
          [cnpj]
        );

        if (clientes.length > 0) {
          const c = clientes[0];
          return res.json({
            success: true,
            data: {
              nome: c.razao_social || "",
              fantasia: c.nome_fantasia || "",
              cep: c.cep || "",
              logradouro: c.endereco || "",
              numero: "",
              complemento: "",
              bairro: "",
              municipio: c.cidade || "",
              uf: c.estado || "",
              atividade_principal: [
                {
                  text: c.ramo_atividade || "",
                  code: "",
                },
              ],
            },
          });
        }
      } finally {
        conn.release();
      }
    } catch (dbErr) {
      console.warn("[GET /api/cnpj/:cnpj] Falha ao consultar base local:", dbErr.message);
    }

    let apiToken = (process.env.CNPJ_WS_API_TOKEN || process.env.RECEITAWS_API_TOKEN || "").trim();
    apiToken = apiToken.replace(/^["']|["']$/g, ""); // remove aspas do .env

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
      let errorMessage = data.message || data.error || data.resultado_txt || data.detail || `Erro ${response.status}: ${response.statusText}`;
      if (response.status === 404) {
        errorMessage = "CNPJ não encontrado na base da Receita Federal. Verifique o número digitado ou preencha os dados da empresa manualmente.";
      } else if (typeof errorMessage !== "string") {
        errorMessage = "CNPJ não encontrado ou inválido.";
      }
      console.error(`[GET /api/cnpj/:cnpj] Erro ${response.status}:`, { message: errorMessage, cnpj });
      return res.status(response.status).json({
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? data : undefined,
      });
    }

    // CNPJ.ws pode retornar resultado=0 em corpo JSON (CNPJ inexistente)
    if (data.resultado === 0 || data.resultado === "0") {
      const msg = "CNPJ não encontrado na base da Receita Federal. Verifique o número digitado ou preencha os dados da empresa manualmente.";
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
      // Buscar cliente no schema novo
      const [clientes] = await conn.execute(
        `SELECT 
           c.id AS id_cliente,
           c.documento,
           c.usuario_id,
           u.email
         FROM clientes c
         LEFT JOIN usuarios u ON c.usuario_id = u.id
         WHERE REPLACE(REPLACE(REPLACE(REPLACE(c.documento, '.', ''), '/', ''), '-', ''), ' ', '') = ? 
         LIMIT 1`,
        [documentoLimpo]
      );

      // Se encontrar pelo menos 1 registro, pode renovar (acessar plataforma)
      const podeRenovar = clientes.length > 0;

      return res.json({
        success: true,
        existe: podeRenovar,
        podeRenovar,
        idCliente: podeRenovar ? clientes[0].id_cliente : null,
        email: podeRenovar ? (clientes[0].email || null) : null,
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

        // Google Ads: Enviar conversão offline (pagamento confirmado)
        const gadsEnabled = (process.env.GOOGLE_ADS_CONVERSION_ENABLED || "").trim().toLowerCase() === "true";
        if (!gadsEnabled) {
          console.log("[Google Ads] Conversão offline DESATIVADA (GOOGLE_ADS_CONVERSION_ENABLED=false)");
        }
        if (gadsEnabled) try {
          const [clienteRows] = await conn.execute(
            `SELECT c.gclid, c.Email, c.TelefoneCelular, c.ProtocoloCadbrasil,
                    c.utm_source, c.utm_term
             FROM tbl_smart_pedido_credenciamento p
             INNER JOIN tbl_smart_clientes c ON p.IdCliente = c.IdCliente
             WHERE p.IdPedido = ?`,
            [idPedido]
          );

          if (clienteRows.length > 0) {
            const cliente = clienteRows[0];
            // Só envia se tiver gclid OU email (conversões otimizadas para leads)
            if (cliente.gclid || cliente.Email) {
              uploadOfflineConversion({
                gclid: cliente.gclid || null,
                conversionDateTime: formatConversionDateTime(new Date()),
                conversionValue: 985.00,
                orderId: cliente.ProtocoloCadbrasil || protocolo || `pedido-${idPedido}`,
                email: cliente.Email || null,
                phone: cliente.TelefoneCelular || null,
              }).then(result => {
                if (result.success) {
                  console.log(`[Google Ads] Conversão offline enviada para pedido ${idPedido}`);
                } else {
                  console.warn(`[Google Ads] Falha ao enviar conversão para pedido ${idPedido}:`, result.error);
                }
              }).catch(err => {
                console.error(`[Google Ads] Exceção ao enviar conversão para pedido ${idPedido}:`, err.message);
              });
            }
          }
        } catch (gadsErr) {
          // Não bloquear o fluxo de pagamento por erro no Google Ads
          console.error("[Google Ads] Erro ao tentar enviar conversão offline:", gadsErr.message);
        }
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

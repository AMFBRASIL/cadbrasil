import Gerencianet from "gn-api-sdk-node";
import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG = (step, msg, detail) => {
  const d = detail != null ? ` | ${typeof detail === "object" ? JSON.stringify(detail) : detail}` : "";
  console.log(`[Gerencianet] ${step} ${msg}${d}`);
};

/** Extrai mensagem de erro da Gerencianet (SDK lança response.data, não Error). */
function extrairMensagemErro(err) {
  if (!err) return "Erro desconhecido";
  if (typeof err === "string") return err;
  const code = err.error;
  let desc = err.error_description ?? err.detail;
  // error_description pode vir como objeto { property, message }
  if (desc && typeof desc === "object") {
    desc = desc.message
      ? (desc.property ? `${desc.property}: ${desc.message}` : desc.message)
      : (desc.property || JSON.stringify(desc));
  }
  if (code && desc && String(code) !== String(desc)) return `${code}: ${desc}`;
  const msg = code || desc || err.message;
  if (msg) return String(msg);
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

/** Verifica se certificado existe e retorna caminho absoluto. */
function resolveCertPath() {
  let raw = process.env.GERENCIANET_CERTIFICATE_PATH;
  if (!raw || typeof raw !== "string") return null;
  raw = raw.trim().replace(/^["']|["']$/g, ""); // remove aspas se vieram do .env
  if (!raw) return null;
  const certPath = path.resolve(__dirname, "..", raw);
  return fs.existsSync(certPath) ? certPath : null;
}

/** Retorna passphrase do certificado (opcional). */
function getCertPassphrase() {
  const raw = process.env.GERENCIANET_CERTIFICATE_PASSPHRASE;
  if (raw == null || typeof raw !== "string") return "";
  return raw.trim().replace(/^["']|["']$/g, "") || "";
}

/** Valida .p12: existe, não vazio. Retorna { ok, error?, size? }. */
function validateP12File(certPath) {
  try {
    const stat = fs.statSync(certPath);
    if (!stat.isFile()) return { ok: false, error: "Caminho não é um arquivo." };
    if (stat.size === 0) return { ok: false, error: "Arquivo .p12 está vazio." };
    if (stat.size < 200) return { ok: false, error: "Arquivo .p12 parece muito pequeno (possível corrompido ou placeholder)." };
    return { ok: true, size: stat.size };
  } catch (e) {
    return { ok: false, error: e?.message || "Erro ao ler arquivo." };
  }
}

/** Remove aspas e espaços/novas linhas das variáveis do .env (evita "Malformed authorization header"). */
function sanitizeEnv(value) {
  if (value == null || typeof value !== "string") return "";
  return value.trim().replace(/^["']|["']$/g, "").trim();
}

// Configuração da Gerencianet
const getGerencianetConfig = () => {
  const sandbox = process.env.GERENCIANET_SANDBOX === "true";
  const clientId = sanitizeEnv(process.env.GERENCIANET_CLIENT_ID);
  const clientSecret = sanitizeEnv(process.env.GERENCIANET_CLIENT_SECRET);

  if (!clientId || !clientSecret) {
    throw new Error("GERENCIANET_CLIENT_ID e GERENCIANET_CLIENT_SECRET são obrigatórios no .env");
  }

  const options = {
    sandbox,
    client_id: clientId,
    client_secret: clientSecret,
  };

  const certPath = resolveCertPath();
  if (certPath) {
    options.certificate = certPath;
    if (process.env.NODE_ENV === "development") {
      console.log("[Gerencianet] Certificado carregado:", certPath);
      const isSandbox = process.env.GERENCIANET_SANDBOX === "true";
      const pathLower = (process.env.GERENCIANET_CERTIFICATE_PATH || "").toLowerCase();
      if (isSandbox && (pathLower.includes("producao") || pathLower.includes("produção"))) {
        console.warn("[Gerencianet] SANDBOX=true mas o certificado parece de PRODUÇÃO. Use certificado de HOMOLOGAÇÃO com sandbox.");
      }
      if (!isSandbox && (pathLower.includes("homolog") || pathLower.includes("sandbox"))) {
        console.warn("[Gerencianet] SANDBOX=false mas o certificado parece de HOMOLOGAÇÃO. Use certificado de PRODUÇÃO.");
      }
    }
  } else {
    let r = (process.env.GERENCIANET_CERTIFICATE_PATH || "").trim().replace(/^["']|["']$/g, "");
    if (r) {
      console.warn(`[Gerencianet] Certificado não encontrado: ${path.resolve(__dirname, "..", r)}`);
    }
  }

  return options;
};

// Instanciar Gerencianet
let gerencianetInstance = null;

const getGerencianet = () => {
  if (!gerencianetInstance) {
    LOG("CONFIG", "Obtendo configuração e instanciando SDK...");
    const config = getGerencianetConfig();
    gerencianetInstance = new Gerencianet(config);
    LOG("CONFIG", "SDK instanciado", { sandbox: config.sandbox, temCertificado: !!config.certificate });
  }
  return gerencianetInstance;
};

// ===== MUTEX/LOCK para evitar chamadas concorrentes ao SDK =====
// O SDK gn-api-sdk-node não lida bem com múltiplas requisições simultâneas.
// Usamos um lock simples para serializar as chamadas.
let sdkLock = Promise.resolve();

/**
 * Executa uma função com lock exclusivo no SDK Gerencianet.
 * Garante que apenas uma chamada à API Gerencianet ocorra por vez.
 * @param {Function} fn - Função async a ser executada
 * @returns {Promise<any>} - Resultado da função
 */
async function withSdkLock(fn) {
  // Espera o lock atual terminar, depois executa a função
  const currentLock = sdkLock;
  let resolve;
  sdkLock = new Promise((r) => { resolve = r; });
  
  try {
    await currentLock; // Espera qualquer operação anterior terminar
    return await fn();
  } finally {
    resolve(); // Libera o lock para a próxima operação
  }
}

/**
 * Gera um boleto em uma única etapa (one-step)
 * @param {Object} dados - Dados do boleto
 * @param {number} dados.valor - Valor em centavos
 * @param {string} dados.vencimento - Data de vencimento (YYYY-MM-DD)
 * @param {Object} dados.cliente - Dados do cliente
 * @param {string} dados.protocolo - Protocolo do pedido
 * @returns {Promise<Object>} Resposta com dados do boleto
 */
export async function gerarBoleto(dados) {
  // Usa lock para evitar concorrência com outras chamadas ao SDK
  return withSdkLock(async () => {
    try {
      LOG("BOLETO 1/5", "Iniciando geração de boleto");
      const gn = getGerencianet();

      LOG("BOLETO 2/5", "Montando payload (items, metadata, customer, banking_billet)");
      const items = [
        {
          name: "Guia de Processamento SICAF - CadBrasil",
          value: dados.valor, // Já em centavos
          amount: 1,
        },
      ];

      // Apenas custom_id e notification_url são aceitos no schema. Protocolo vai na message do boleto.
      const metadata = {
        custom_id: dados.idPedido?.toString() || dados.protocolo || "",
      };

      // Boleto: dados da EMPRESA (Razão Social + CNPJ). PF: nome + CPF.
      const isPJ = !!dados.cliente.cnpj;
      const name = isPJ
        ? (dados.cliente.razaoSocial || dados.cliente.nome || "Cliente")
        : (dados.cliente.nome || "Cliente");
      const email = (dados.cliente.email || "").trim();
      if (!email) throw new Error("E-mail do cliente é obrigatório para gerar boleto.");
      const customer = {
        name: name || "Cliente",
        email,
      };
      const telRaw = dados.cliente.telefone ? String(dados.cliente.telefone).replace(/\D/g, "") : "";
      const tel = telRaw.replace(/^0+/, ""); // remove zeros à esquerda (ex.: 011...)
      const phoneMatch = /^[1-9]{2}9?[0-9]{8}$/.test(tel);
      if (phoneMatch) customer.phone_number = tel;

      if (isPJ) {
        customer.juridical_person = {
          corporate_name: dados.cliente.razaoSocial || dados.cliente.nome || name,
          cnpj: dados.cliente.cnpj.replace(/\D/g, ""),
        };
      } else if (dados.cliente.cpf) {
        customer.cpf = dados.cliente.cpf.replace(/\D/g, "");
      }

      // Adicionar endereço só se tiver CEP (8 dígitos) e cidade; evita validation_error por campos vazios
      const end = dados.cliente.endereco;
      const zip = end?.cep?.replace(/\D/g, "") || "";
      const hasZip = zip.length === 8;
      const city = (end?.cidade || "").trim();
      if (end && hasZip && city) {
        customer.address = {
          street: (end.logradouro || "").trim() || "Não informado",
          number: (end.numero || "").trim() || "S/N",
          neighborhood: (end.bairro || "").trim() || "Não informado",
          zipcode: zip,
          city,
          state: (end.uf || "").trim().slice(0, 2) || "SP",
          complement: (end.complemento || "").trim() || null,
        };
      }

      const bankingBillet = {
        expire_at: dados.vencimento, // Formato: YYYY-MM-DD
        message: `Assessoria CADBRASIL\nServiços de assessoria para licitações\nReferência: ${dados.protocolo || ""}`,
        customer: customer,
      };

      const payment = {
        banking_billet: bankingBillet,
      };

      const body = {
        items: items,
        metadata: metadata,
        payment: payment,
      };

      LOG("BOLETO 3/5", "Chamando createOneStepCharge (API cobrança)...");
      const response = await gn.createOneStepCharge({}, body);
      LOG("BOLETO 4/5", "createOneStepCharge OK", { charge_id: response?.data?.charge_id });
      LOG("BOLETO 5/5", "Boleto gerado com sucesso");
      return response;
    } catch (error) {
      const msg = extrairMensagemErro(error);
      LOG("BOLETO ERRO", `Parou em createOneStepCharge: ${msg}`);
      console.error("[Gerencianet] Erro ao gerar boleto:", error);
      const e = new Error(msg || "Erro ao gerar boleto na Gerencianet.");
      e.raw = error;
      throw e;
    }
  }); // fim withSdkLock
}

/**
 * Diagnóstico de boleto: tenta criar cobrança mínima (1 centavo) para debugar em produção.
 * Útil quando gerar-boleto falha localmente mas funciona em dev.
 * @returns {Promise<{ ok: boolean, boletoStatus?: number, charge_id?: number, error?: string, message?: string }>}
 */
export async function diagnosticoBoleto() {
  const out = { ok: false, boletoStatus: null, charge_id: null, error: null, message: "", config: {} };
  try {
    const clientId = sanitizeEnv(process.env.GERENCIANET_CLIENT_ID);
    const clientSecret = sanitizeEnv(process.env.GERENCIANET_CLIENT_SECRET);
    const certPath = resolveCertPath();
    const sandbox = process.env.GERENCIANET_SANDBOX === "true";
    out.config = { hasClientId: !!clientId, hasClientSecret: !!clientSecret, hasCert: !!certPath, sandbox };
    if (!clientId || !clientSecret) {
      out.error = "GERENCIANET_CLIENT_ID e GERENCIANET_CLIENT_SECRET são obrigatórios no .env";
      return out;
    }
    const exp = new Date();
    exp.setDate(exp.getDate() + 30);
    const expireAt = exp.toISOString().slice(0, 10); // YYYY-MM-DD
    const ts = Date.now();
    // Cobrança única a cada execução para evitar "mais de três cobranças idênticas"
    const valueCents = 1 + (ts % 99);
    const customId = `diagnostico-boleto-${ts}`;

    const body = {
      items: [{ name: `Teste diagnóstico boleto ${ts}`, value: valueCents, amount: 1 }],
      metadata: { custom_id: customId },
      payment: {
        banking_billet: {
          expire_at: expireAt,
          customer: {
            name: `Teste Diagnostico ${ts}`,
            email: "teste@cadbrasil.com.br",
            cpf: "94271564656",
            birth: "1977-01-15",
            phone_number: "51987654321",
          },
        },
      },
    };

    const gn = getGerencianet();
    const res = await gn.createOneStepCharge({}, body);
    const chargeId = res?.data?.charge_id;
    out.ok = true;
    out.boletoStatus = 201;
    out.charge_id = chargeId;
    out.message = "Boleto OK. createOneStepCharge respondeu com sucesso.";
    return out;
  } catch (err) {
    const msg = extrairMensagemErro(err);
    out.error = msg;
    out.message = `Erro ao gerar boleto de teste: ${msg}`;
    if (err?.raw != null) out.raw = err.raw;
    return out;
  }
}

/**
 * Gera um PIX em uma única etapa
 * @param {Object} dados - Dados do PIX
 * @param {number} dados.valor - Valor em centavos
 * @param {Object} dados.cliente - Dados do cliente
 * @param {string} dados.protocolo - Protocolo do pedido
 * @param {string} dados.chavePix - Chave PIX da conta (opcional)
 * @returns {Promise<Object>} Resposta com dados do PIX (QR Code, código copia e cola, etc)
 */
export async function gerarPix(dados) {
  // Usa lock para evitar concorrência com outras chamadas ao SDK
  return withSdkLock(async () => {
    try {
      LOG("PIX 1/7", "Iniciando geração de PIX");

      const certPath = resolveCertPath();
      if (!certPath) {
        LOG("PIX ERRO", "Parou em 1/7: certificado .p12 não encontrado");
        throw new Error(
          "PIX exige certificado .p12. Configure GERENCIANET_CERTIFICATE_PATH no .env e coloque o arquivo em server/certificados/."
        );
      }
      LOG("PIX 2/7", "Certificado OK", { path: certPath });

      const chave = dados.chavePix || process.env.GERENCIANET_PIX_KEY || "pix@cadbrasil.com.br";
      if (!chave || !chave.trim()) {
        LOG("PIX ERRO", "Parou em 2/7: chave PIX não configurada");
        throw new Error("Chave PIX não configurada. Defina GERENCIANET_PIX_KEY no .env.");
      }
      LOG("PIX 3/7", "Chave PIX e cliente (devedor) OK");

      const gn = getGerencianet();

      const nome = dados.cliente.nome || dados.cliente.razaoSocial || "Cliente";
      const cpf = dados.cliente.cpf ? String(dados.cliente.cpf).replace(/\D/g, "") : "";
      const cnpj = dados.cliente.cnpj ? String(dados.cliente.cnpj).replace(/\D/g, "") : "";

      const devedor = { nome };
      if (cpf.length === 11) devedor.cpf = cpf;
      else if (cnpj.length === 14) devedor.cnpj = cnpj;
      else {
        LOG("PIX ERRO", "Parou em 3/7: CPF/CNPJ inválido (precisa 11 ou 14 dígitos)");
        throw new Error("Para PIX é obrigatório CPF (11 dígitos) ou CNPJ (14 dígitos) do pagador.");
      }

      // Body alinhado ao exemplo PHP (gerarpix.php / pix.php): mesmo formato e campos
      const valorOriginal = (dados.valor / 100).toFixed(2);
      const body = {
        calendario: { expiracao: 3600 },
        devedor,
        valor: { original: valorOriginal },
        chave: chave.trim(),
        solicitacaoPagador: String(dados.protocolo || ""),
        infoAdicionais: [
          { nome: "Protocolo SICAF", valor: String(dados.protocolo || "") },
          { nome: "Email", valor: String(dados.cliente.email || "") },
          { nome: "Serviço", valor: "Credenciamento SICAF CADBRASIL" },
        ],
      };
      LOG("PIX 4/7", "Body da cobrança montado", { valor: body.valor?.original, devedorCpfCnpj: !!devedor.cpf || !!devedor.cnpj });

      LOG("PIX 5/7", "Chamando pixCreateImmediateCharge (OAuth + API PIX)...", { chave: chave.trim() });
      const pixResponse = await gn.pixCreateImmediateCharge([], body);
      LOG("PIX 5/7", "pixCreateImmediateCharge OK", { txid: pixResponse?.txid, locId: pixResponse?.loc?.id });

      if (!pixResponse?.txid || !pixResponse?.loc?.id) {
        LOG("PIX ERRO", "Parou em 5/7: txid ou loc.id não retornado");
        throw new Error("Erro ao criar cobrança PIX: txid ou loc não retornado.");
      }

      // Igual ao exemplo PHP: params = ["id" => $pix["loc"]["id"]]
      const qrParams = { id: pixResponse.loc.id };
      LOG("PIX 6/7", "Chamando pixGenerateQRCode...", qrParams);
      const qrcodeResponse = await gn.pixGenerateQRCode(qrParams);
      LOG("PIX 6/7", "pixGenerateQRCode OK");
      LOG("PIX 7/7", "PIX gerado com sucesso");

      return { ...pixResponse, qrcode: qrcodeResponse };
    } catch (error) {
      const msg = extrairMensagemErro(error);
      LOG("PIX ERRO", `Exceção: ${msg}`);
      if (process.env.NODE_ENV === "development") {
        try {
          console.error("[Gerencianet] Erro ao gerar PIX (raw):", JSON.stringify(error, null, 2));
        } catch {
          console.error("[Gerencianet] Erro ao gerar PIX (raw):", error);
        }
      } else {
        console.error("[Gerencianet] Erro ao gerar PIX:", error);
      }
      const e = new Error(msg || "Erro ao gerar PIX na Gerencianet.");
      e.raw = error;
      throw e;
    }
  }); // fim withSdkLock
}

/**
 * Consulta o status de uma cobrança
 * @param {number} chargeId - ID da cobrança
 * @returns {Promise<Object>} Status da cobrança
 */
export async function consultarCobranca(chargeId) {
  return withSdkLock(async () => {
    try {
      const gn = getGerencianet();
      const response = await gn.detailCharge(chargeId);
      return response;
    } catch (error) {
      console.error("[Gerencianet] Erro ao consultar cobrança:", error);
      throw error;
    }
  });
}

/**
 * Consulta o status de um pagamento PIX
 * @param {string} txid - Transaction ID do PIX
 * @returns {Promise<Object>} Status do pagamento PIX
 */
export async function consultarPix(txid) {
  return withSdkLock(async () => {
    try {
      const gn = getGerencianet();
      const response = await gn.pixDetailCharge({ txid }, []);
      return response;
    } catch (error) {
      console.error("[Gerencianet] Erro ao consultar PIX:", error);
      throw error;
    }
  });
}

/**
 * Obtém token OAuth da API PIX (usa certificado + client_id/secret).
 * @returns {Promise<{ access_token: string, host: string }>}
 */
function getPixOAuthToken() {
  const certPath = resolveCertPath();
  if (!certPath) throw new Error("Certificado .p12 não encontrado. Configure GERENCIANET_CERTIFICATE_PATH.");
  const clientId = sanitizeEnv(process.env.GERENCIANET_CLIENT_ID);
  const clientSecret = sanitizeEnv(process.env.GERENCIANET_CLIENT_SECRET);
  if (!clientId || !clientSecret) throw new Error("GERENCIANET_CLIENT_ID e GERENCIANET_CLIENT_SECRET são obrigatórios.");

  const sandbox = process.env.GERENCIANET_SANDBOX === "true";
  const host = sandbox ? "api-pix-h.gerencianet.com.br" : "api-pix.gerencianet.com.br";
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = JSON.stringify({ grant_type: "client_credentials" });

  return new Promise((resolve, reject) => {
    const agent = new https.Agent({
      pfx: fs.readFileSync(certPath),
      passphrase: "",
    });
    const req = https.request(
      {
        host,
        port: 443,
        path: "/oauth/token",
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
        agent,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = data ? JSON.parse(data) : null;
          } catch {
            parsed = { _raw: data };
          }
          if (res.statusCode >= 200 && res.statusCode < 300 && parsed?.access_token) {
            return resolve({ access_token: parsed.access_token, host });
          }
          reject(new Error(parsed?.error_description || parsed?.error || `OAuth HTTP ${res.statusCode}`));
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/**
 * Diagnóstico PIX: testa apenas o OAuth (token) da API PIX.
 * Útil para saber se o Forbidden vem da autenticação (cert + client_id/secret) ou da cobrança.
 * @returns {{ ok: boolean, step: 'oauth', error?: string, raw?: object }}
 */
export async function diagnosticoPix() {
  LOG("DIAG 1/4", "Diagnóstico PIX (OAuth) iniciado");
  try {
    const certPath = resolveCertPath();
    if (!certPath) {
      LOG("DIAG ERRO", "Parou em 1/4: certificado não encontrado");
      return { ok: false, step: "oauth", error: "Certificado .p12 não encontrado.", raw: null };
    }
    LOG("DIAG 2/4", "Certificado OK", { path: certPath });
    const clientId = sanitizeEnv(process.env.GERENCIANET_CLIENT_ID);
    const clientSecret = sanitizeEnv(process.env.GERENCIANET_CLIENT_SECRET);
    if (!clientId || !clientSecret) {
      LOG("DIAG ERRO", "Parou em 2/4: client_id ou client_secret ausentes");
      return { ok: false, step: "oauth", error: "GERENCIANET_CLIENT_ID e GERENCIANET_CLIENT_SECRET são obrigatórios.", raw: null };
    }
    LOG("DIAG 3/4", "Credenciais OK, enviando POST /oauth/token...");
    await getPixOAuthToken();
    LOG("DIAG 4/4", "OAuth OK", { status: 200 });
    return { ok: true, step: "oauth", raw: { access_token: "(hidden)" } };
  } catch (e) {
    LOG("DIAG ERRO", "OAuth falhou", { message: e?.message });
    return {
      ok: false,
      step: "oauth",
      error: e?.message || String(e),
      raw: process.env.NODE_ENV === "development" && e ? { message: e.message } : undefined,
    };
  }
}

/**
 * Diagnóstico PIX + POST /v2/cob: OAuth + cobrança imediata (body mínimo).
 * Ajuda a debugar 404 na criação de PIX (chave, escopos, body).
 * @returns {{ oauthOk: boolean, cobStatus?: number, cobResponse?: object, request?: object, error?: string }}
 */
export async function diagnosticoPixCob() {
  LOG("DIAG-COB 1/3", "Diagnóstico PIX (OAuth + POST /v2/cob) iniciado");
  const out = { oauthOk: false, cobStatus: null, cobResponse: null, request: null, error: null };

  let token;
  try {
    token = await getPixOAuthToken();
    out.oauthOk = true;
  } catch (e) {
    out.error = "OAuth falhou: " + (e?.message || String(e));
    LOG("DIAG-COB ERRO", out.error);
    return out;
  }
  LOG("DIAG-COB 2/3", "OAuth OK, enviando POST /v2/cob...");

  const chave = (process.env.GERENCIANET_PIX_KEY || "pix@cadbrasil.com.br").trim();
  const body = {
    calendario: { expiracao: 3600 },
    devedor: { cpf: "12345678909", nome: "Teste Diag" },
    valor: { original: "0.01" },
    chave,
    solicitacaoPagador: "diagnostico-pix-cob",
    infoAdicionais: [{ nome: "Serviço", valor: "Diagnóstico CADBRASIL" }],
  };
  const bodyStr = JSON.stringify(body);
  out.request = { method: "POST", url: `https://${token.host}/v2/cob`, bodyKeys: Object.keys(body), chave };

  return new Promise((resolve) => {
    const agent = new https.Agent({
      pfx: fs.readFileSync(resolveCertPath()),
      passphrase: "",
    });
    const req = https.request(
      {
        host: token.host,
        port: 443,
        path: "/v2/cob",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
        },
        agent,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => { data += chunk; });
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = data ? JSON.parse(data) : null;
          } catch {
            parsed = { _raw: data };
          }
          out.cobStatus = res.statusCode;
          out.cobResponse = parsed;
          LOG("DIAG-COB 3/3", "POST /v2/cob retornou", { status: res.statusCode, hasTxid: !!parsed?.txid });
          if (res.statusCode >= 200 && res.statusCode < 300) {
            out.error = null;
          } else {
            out.error = parsed?.error_description || parsed?.error || `HTTP ${res.statusCode}`;
          }
          resolve(out);
        });
      }
    );
    req.on("error", (err) => {
      out.error = "Erro de rede: " + (err?.message || String(err));
      LOG("DIAG-COB ERRO", out.error);
      resolve(out);
    });
    req.write(bodyStr);
    req.end();
  });
}

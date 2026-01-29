const BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface CadastroPayload {
  tipoPessoa: "cpf" | "cnpj" | "";
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnae: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
  cargoResponsavel: string;
  telefoneResponsavel: string;
  emailResponsavel: string;
  tipoServico: "novo" | "renovacao" | "";
  segmentoAtuacao: string;
  objetivoLicitacao: string;
  emailAcesso: string;
  senha: string;
  aceitaNotificacoes: boolean;
}

export interface CadastroResponse {
  success: boolean;
  protocolo?: string;
  idCliente?: number;
  idUsuario?: number;
  idPedido?: number;
  error?: string;
}

export async function enviarCadastro(payload: CadastroPayload): Promise<CadastroResponse> {
  const res = await fetch(`${BASE}/api/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json()) as CadastroResponse;
  if (!res.ok) {
    throw new Error(json.error || "Erro ao enviar cadastro.");
  }
  return json;
}

export interface CNPJResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function buscarCNPJ(cnpj: string): Promise<CNPJResponse> {
  const cnpjLimpo = cnpj.replace(/\D/g, "");
  const res = await fetch(`${BASE}/api/cnpj/${cnpjLimpo}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  
  const json = (await res.json()) as CNPJResponse;
  
  // Verificar se houve erro mesmo com HTTP 200 (ex: "Quota Exceeded")
  if (!res.ok || !json.success) {
    const errorMessage = json.error || "Erro ao buscar CNPJ.";
    throw new Error(errorMessage);
  }
  
  return json;
}

export interface ClienteExistenteResponse {
  success: boolean;
  existe?: boolean;
  podeRenovar?: boolean;
  idCliente?: number;
  email?: string | null;
  error?: string;
}

export async function verificarClienteExistente(
  documento: string,
  tipoPessoa: "cpf" | "cnpj"
): Promise<ClienteExistenteResponse> {
  const documentoLimpo = documento.replace(/\D/g, "");
  const res = await fetch(`${BASE}/api/renovacao/verificar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      documento: documentoLimpo,
      tipoPessoa,
    }),
  });
  
  if (!res.ok) {
    let errorMessage = "Erro ao verificar cliente.";
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.error || errorMessage;
    } catch {
      errorMessage = `Erro ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  const json = (await res.json()) as ClienteExistenteResponse;
  return json;
}

export interface VerificarPagamentoResponse {
  success: boolean;
  pago?: boolean;
  mensagem?: string;
  error?: string;
}

export async function verificarPagamentoPIX(
  idPedido: number | null,
  txid: string,
  protocolo: string
): Promise<VerificarPagamentoResponse> {
  const res = await fetch(`${BASE}/api/pagamento/verificar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idPedido,
      txid,
      protocolo,
    }),
  });
  
  if (!res.ok) {
    let errorMessage = "Erro ao verificar pagamento.";
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.error || errorMessage;
    } catch {
      errorMessage = `Erro ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  const json = (await res.json()) as VerificarPagamentoResponse;
  return json;
}

export interface GerarBoletoResponse {
  success: boolean;
  charge_id?: number;
  boleto?: {
    barcode?: string;
    link?: string;
    pdf?: string;
    expire_at?: string;
    linha_digitavel?: string;
  };
  error?: string;
}

export interface GerarPixResponse {
  success: boolean;
  txid?: string;
  pix?: {
    qrcode?: string;
    qrcode_image?: string;
    copy_paste?: string;
  };
  error?: string;
}

export async function gerarBoleto(
  idPedido: number,
  protocolo: string,
  valor: number,
  vencimento: string,
  cliente: {
    nome?: string;
    razaoSocial?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
    endereco?: any;
  }
): Promise<GerarBoletoResponse> {
  const res = await fetch(`${BASE}/api/pagamento/gerar-boleto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idPedido,
      protocolo,
      valor,
      vencimento,
      cliente,
    }),
  });
  
  if (!res.ok) {
    let errorMessage = "Erro ao gerar boleto.";
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.error || errorMessage;
    } catch {
      errorMessage = `Erro ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  const json = (await res.json()) as GerarBoletoResponse;
  return json;
}

export async function gerarPix(
  idPedido: number,
  protocolo: string,
  valor: number,
  cliente: {
    nome?: string;
    email?: string;
    telefone?: string;
    cpf?: string;
    cnpj?: string;
  }
): Promise<GerarPixResponse> {
  const res = await fetch(`${BASE}/api/pagamento/gerar-pix`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idPedido,
      protocolo,
      valor,
      cliente,
    }),
  });
  
  if (!res.ok) {
    let errorMessage = "Erro ao gerar PIX.";
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.error || errorMessage;
      if (import.meta.env.DEV && errorJson.raw != null) {
        console.error("[API] Gerencianet PIX – erro completo (raw):", errorJson.raw);
      }
    } catch {
      errorMessage = `Erro ${res.status}: ${res.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const json = (await res.json()) as GerarPixResponse;
  return json;
}

export interface ContatoPayload {
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  assunto: string;
  mensagem: string;
}

export interface ContatoResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function enviarContato(payload: ContatoPayload): Promise<ContatoResponse> {
  const res = await fetch(`${BASE}/api/contato`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json()) as ContatoResponse;
  if (!res.ok) {
    throw new Error(json.error || "Erro ao enviar mensagem.");
  }
  return json;
}

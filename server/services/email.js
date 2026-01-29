const API_EMAIL_URL = process.env.EMAIL_API_URL || "https://send.cadbr.com.br/sendCron";

function escapeHtml(s) {
  if (s == null || typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Gera o HTML do email de confirmação de cadastro
 */
function getEmailHTMLBody(razaoSocial, nomeResponsavel, protocolo, tipoServico) {
  const tipoTexto = tipoServico === "renovacao" ? "Renovação" : "Novo Cadastro";
  
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastro Recebido - CADBRASIL</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: #1E4632; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">CADBRASIL</h1>
    <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Cadastro SICAF e Consultoria em Licitações</p>
  </div>
  
  <div style="background-color: white; padding: 30px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1E4632; margin-top: 0;">Cadastro Recebido com Sucesso!</h2>
    
    <p>Olá <strong>${nomeResponsavel}</strong>,</p>
    
    <p>Recebemos seu pré-cadastro para <strong>${tipoTexto} SICAF</strong> da empresa <strong>${razaoSocial}</strong>.</p>
    
    <div style="background-color: #f0f9f4; border-left: 4px solid #1E4632; padding: 15px; margin: 20px 0;">
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold;">Protocolo CADBRASIL</p>
      <p style="margin: 0; font-size: 28px; font-weight: bold; color: #1E4632; letter-spacing: 2px; font-family: monospace;">${protocolo}</p>
    </div>
    
    <h3 style="color: #1E4632; margin-top: 30px;">Próximos Passos:</h3>
    <ol style="padding-left: 20px; line-height: 2;">
      <li>Acesse o <strong>Portal do Fornecedor</strong> usando o e-mail e senha cadastrados</li>
      <li>Envie a documentação necessária para o cadastro SICAF</li>
      <li>Acompanhe o status do seu processo pelo portal</li>
    </ol>
    
    <div style="margin: 30px 0; text-align: center;">
      <a href="https://fornecedor.cadbr.com.br" 
         style="background-color: #1E4632; color: white; padding: 14px 35px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; font-size: 16px;">
        Acessar Portal do Fornecedor
      </a>
    </div>
    
    <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 5px; padding: 15px; margin: 25px 0;">
      <p style="margin: 0; font-size: 14px; color: #856404;">
        <strong>⚠️ Importante:</strong> Este é um serviço privado de assessoria. A CADBRASIL não possui vínculo com órgãos governamentais.
      </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
    
    <div style="text-align: center; color: #666; font-size: 12px;">
      <p style="margin: 5px 0;"><strong>Dúvidas? Entre em contato:</strong></p>
      <p style="margin: 5px 0;">📞 <a href="tel:+551121220202" style="color: #1E4632;">(011) 2122-0202</a></p>
      <p style="margin: 5px 0;">📧 <a href="mailto:documentos@fornecedordigital.com.br" style="color: #1E4632;">documentos@fornecedordigital.com.br</a></p>
      <p style="margin: 5px 0;">💬 WhatsApp: <a href="https://wa.me/551121220202" style="color: #1E4632;">(011) 2122-0202</a></p>
    </div>
    
    <p style="text-align: center; font-size: 11px; color: #999; margin-top: 30px;">
      © ${new Date().getFullYear()} CADBRASIL - Todos os direitos reservados
    </p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Gera o texto do email de confirmação de cadastro
 */
function getEmailTextBody(razaoSocial, nomeResponsavel, protocolo, tipoServico) {
  const tipoTexto = tipoServico === "renovacao" ? "Renovação" : "Novo Cadastro";
  
  return `
CADBRASIL - Cadastro Recebido com Sucesso!

Olá ${nomeResponsavel},

Recebemos seu pré-cadastro para ${tipoTexto} SICAF da empresa ${razaoSocial}.

═══════════════════════════════════════════════════════
PROTOCOLO CADBRASIL: ${protocolo}
═══════════════════════════════════════════════════════

PRÓXIMOS PASSOS:

1. Acesse o Portal do Fornecedor usando o e-mail e senha cadastrados
   URL: https://fornecedor.cadbr.com.br

2. Envie a documentação necessária para o cadastro SICAF

3. Acompanhe o status do seu processo pelo portal

───────────────────────────────────────────────────────

⚠️ IMPORTANTE: Este é um serviço privado de assessoria. 
A CADBRASIL não possui vínculo com órgãos governamentais.

───────────────────────────────────────────────────────

DÚVIDAS? ENTRE EM CONTATO:

📞 Telefone: (011) 2122-0202
📧 E-mail: documentos@fornecedordigital.com.br
💬 WhatsApp: (011) 2122-0202

───────────────────────────────────────────────────────

© ${new Date().getFullYear()} CADBRASIL - Todos os direitos reservados
  `.trim();
}

/**
 * Envia email de confirmação de cadastro via API externa
 */
export async function enviarEmailCadastro(dados) {
  const {
    emailResponsavel,
    nomeResponsavel,
    razaoSocial,
    protocolo,
    tipoServico,
  } = dados;

  if (!API_EMAIL_URL || API_EMAIL_URL.includes("your-")) {
    console.warn("[EMAIL] API de email não configurada. Email não será enviado.");
    return { success: false, message: "API de email não configurada" };
  }

  try {
    const html = getEmailHTMLBody(razaoSocial, nomeResponsavel, protocolo, tipoServico);
    const texto = getEmailTextBody(razaoSocial, nomeResponsavel, protocolo, tipoServico);

    const dadosEmail = {
      email_destino: emailResponsavel,
      nome_destino: razaoSocial,
      assunto: `Boas vindas - Sistema CADBRASIL SICAF - ${new Date().toLocaleTimeString("pt-BR")}`,
      corpo_html: html,
      corpo_texto: texto,
      prioridade: 1, // 1 = mais alta, 5 = mais baixa
      max_tentativas: 3,
      id_dominio: null, // null = rotação automática
      data_agendamento: null, // null = envio imediato
    };

    console.log(`[EMAIL] Enviando para: ${emailResponsavel}`);

    const response = await fetch(API_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(dadosEmail),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("[EMAIL] Enviado com sucesso:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("[EMAIL] Erro ao enviar:", error);
    throw error;
  }
}

/**
 * Envia email de notificação interna (opcional)
 */
export async function enviarEmailNotificacao(dados) {
  const emailNotificacao = process.env.EMAIL_NOTIFICATION_EMAIL;
  
  if (!emailNotificacao || !API_EMAIL_URL || API_EMAIL_URL.includes("your-")) {
    return { success: false, message: "Email de notificação não configurado" };
  }

  const { razaoSocial, cnpj, protocolo, tipoServico, emailResponsavel } = dados;
  const tipoTexto = tipoServico === "renovacao" ? "Renovação" : "Novo Cadastro";

  const html = `
    <h2>Novo Cadastro Recebido</h2>
    <p><strong>Protocolo:</strong> ${protocolo}</p>
    <p><strong>Tipo:</strong> ${tipoTexto}</p>
    <p><strong>Empresa:</strong> ${razaoSocial}</p>
    <p><strong>CNPJ:</strong> ${cnpj}</p>
    <p><strong>E-mail:</strong> ${emailResponsavel}</p>
    <p><strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}</p>
  `;

  const texto = `
Novo Cadastro Recebido

Protocolo: ${protocolo}
Tipo: ${tipoTexto}
Empresa: ${razaoSocial}
CNPJ: ${cnpj}
E-mail: ${emailResponsavel}
Data: ${new Date().toLocaleString("pt-BR")}
  `;

  try {
    const dadosEmail = {
      email_destino: emailNotificacao,
      nome_destino: "Equipe CADBRASIL",
      assunto: `[CADBRASIL] Novo Cadastro - ${protocolo}`,
      corpo_html: html,
      corpo_texto: texto,
      prioridade: 1,
      max_tentativas: 3,
      id_dominio: null,
      data_agendamento: null,
    };

    const response = await fetch(API_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(dadosEmail),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("[EMAIL] Notificação enviada com sucesso:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("[EMAIL] Erro ao enviar notificação:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Envia email do formulário de contato (página /contato) para a API send.cadbr.com.br
 * Destino: EMAIL_NOTIFICATION_EMAIL (ou CONTACT_FORM_EMAIL se definido)
 */
export async function enviarEmailContato(dados) {
  const emailDestino = process.env.CONTACT_FORM_EMAIL || process.env.EMAIL_NOTIFICATION_EMAIL;
  if (!emailDestino || !API_EMAIL_URL || API_EMAIL_URL.includes("your-")) {
    console.warn("[EMAIL] API ou email de contato não configurado. Configure EMAIL_API_URL e EMAIL_NOTIFICATION_EMAIL (ou CONTACT_FORM_EMAIL).");
    return { success: false, message: "Serviço de contato não configurado." };
  }

  const { nome, email, telefone, empresa, assunto, mensagem } = dados;
  const n = escapeHtml(nome || "");
  const e = escapeHtml(email || "");
  const t = escapeHtml(telefone || "-");
  const emp = escapeHtml(empresa || "-");
  const a = escapeHtml(assunto || "");
  const m = escapeHtml(mensagem || "").replace(/\n/g, "<br>");

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Contato pelo site - CADBRASIL</title></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #1E4632; color: white; padding: 16px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 20px;">CADBRASIL - Novo contato pelo site</h1>
  </div>
  <div style="background: #fff; padding: 24px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px;">
    <p><strong>Nome:</strong> ${n}</p>
    <p><strong>E-mail:</strong> ${e}</p>
    <p><strong>Telefone:</strong> ${t}</p>
    <p><strong>Empresa:</strong> ${emp}</p>
    <p><strong>Assunto:</strong> ${a}</p>
    <h3 style="color: #1E4632; margin-top: 20px;">Mensagem</h3>
    <p style="white-space: pre-wrap;">${m}</p>
    <p style="margin-top: 24px; font-size: 12px; color: #666;">Enviado em ${new Date().toLocaleString("pt-BR")} pelo formulário de contato.</p>
  </div>
</body>
</html>`.trim();

  const texto = `CADBRASIL - Novo contato pelo site\n\nNome: ${nome || "-"}\nE-mail: ${email || "-"}\nTelefone: ${telefone || "-"}\nEmpresa: ${empresa || "-"}\nAssunto: ${assunto || "-"}\n\nMensagem:\n${mensagem || "-"}\n\nEnviado em ${new Date().toLocaleString("pt-BR")}.`;

  try {
    const payload = {
      email_destino: emailDestino,
      nome_destino: "Equipe CADBRASIL",
      assunto: `[CADBRASIL Contato] ${(assunto || "Formulário de contato").slice(0, 80)}`,
      corpo_html: html,
      corpo_texto: texto,
      prioridade: 1,
      max_tentativas: 3,
      id_dominio: null,
      data_agendamento: null,
    };

    console.log("[EMAIL] Enviando contato para:", emailDestino, "| assunto:", payload.assunto);

    const response = await fetch(API_EMAIL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[EMAIL] Contato API erro:", response.status, errorText);
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log("[EMAIL] Contato enviado com sucesso:", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("[EMAIL] Erro ao enviar contato:", error);
    throw error;
  }
}

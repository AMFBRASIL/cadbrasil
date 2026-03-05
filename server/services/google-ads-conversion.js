/**
 * Google Ads Offline Conversion Upload
 * 
 * Envia conversões offline (pagamentos confirmados) para o Google Ads,
 * permitindo rastrear qual palavra-chave/clique gerou um cliente pagante.
 * 
 * Documentação: https://developers.google.com/google-ads/api/docs/conversions/upload-offline
 * 
 * REQUISITOS para configurar:
 * 1. No Google Ads, criar uma ação de conversão do tipo "Importação > Acompanhar conversões de outro tipo"
 *    - Nome sugerido: "Pagamento Confirmado"
 *    - Categoria: "Compra/Venda"
 *    - Tipo: "Importação de cliques"
 * 
 * 2. Obter credenciais da Google Ads API:
 *    - Developer Token: solicitar em https://ads.google.com/aw/apicenter
 *    - OAuth2 Client ID e Client Secret: criar em https://console.cloud.google.com
 *    - Refresh Token: gerar usando o OAuth2 Playground
 * 
 * 3. Configurar no .env:
 *    GOOGLE_ADS_CUSTOMER_ID=1234567890          (sem hífens)
 *    GOOGLE_ADS_DEVELOPER_TOKEN=xxxx
 *    GOOGLE_ADS_CLIENT_ID=xxxx.apps.googleusercontent.com
 *    GOOGLE_ADS_CLIENT_SECRET=xxxx
 *    GOOGLE_ADS_REFRESH_TOKEN=xxxx
 *    GOOGLE_ADS_CONVERSION_ACTION_ID=123456789  (ID da ação de conversão criada)
 */

import crypto from "crypto";

// Normaliza e gera hash SHA-256 de um valor (usado para email, telefone, etc.)
function normalizeAndHash(value) {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "");
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

// Normalização específica para emails (remove pontos antes de gmail.com/googlemail.com)
function normalizeAndHashEmail(email) {
  if (!email) return null;
  let normalized = email.trim().toLowerCase();
  const parts = normalized.split("@");
  if (parts.length > 1 && /^(gmail|googlemail)\.com\s*$/.test(parts[1])) {
    parts[0] = parts[0].replace(/\./g, "");
    const plusIndex = parts[0].indexOf("+");
    if (plusIndex !== -1) {
      parts[0] = parts[0].substring(0, plusIndex);
    }
    normalized = `${parts[0]}@${parts[1]}`;
  }
  return crypto.createHash("sha256").update(normalized, "utf8").digest("hex");
}

/**
 * Obtém access token OAuth2 usando refresh token.
 */
async function getAccessToken() {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Credenciais Google Ads API não configuradas no .env");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Erro ao obter access token Google: ${err}`);
  }

  const data = await res.json();
  return data.access_token;
}

/**
 * Envia uma conversão offline para o Google Ads.
 * Deve ser chamado quando um pagamento é confirmado.
 * 
 * @param {Object} params
 * @param {string} params.gclid - Google Click ID (capturado na chegada do cliente)
 * @param {string} params.conversionDateTime - Data/hora da conversão (formato: "2026-01-29 15:30:00-03:00")
 * @param {number} params.conversionValue - Valor em BRL (ex: 985.00)
 * @param {string} [params.orderId] - ID do pedido (ex: protocolo)
 * @param {string} [params.email] - Email do cliente (será normalizado e hashed)
 * @param {string} [params.phone] - Telefone do cliente (será normalizado e hashed)
 */
export async function uploadOfflineConversion({
  gclid,
  conversionDateTime,
  conversionValue,
  orderId,
  email,
  phone,
}) {
  const customerId = (process.env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, "");
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID;

  if (!customerId || !developerToken || !conversionActionId) {
    console.warn("[Google Ads] Conversão offline não enviada: credenciais não configuradas no .env");
    return { success: false, error: "Credenciais Google Ads não configuradas" };
  }

  try {
    const accessToken = await getAccessToken();

    // Montar os user identifiers (dados do cliente com hash)
    const userIdentifiers = [];
    if (email) {
      userIdentifiers.push({
        hashedEmail: normalizeAndHashEmail(email),
        userIdentifierSource: "FIRST_PARTY",
      });
    }
    if (phone) {
      userIdentifiers.push({
        hashedPhoneNumber: normalizeAndHash(phone),
        userIdentifierSource: "FIRST_PARTY",
      });
    }

    // Montar o objeto de conversão
    const clickConversion = {
      conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
      conversionDateTime,
      conversionValue,
      currencyCode: "BRL",
      ...(gclid && { gclid }),
      ...(orderId && { orderId }),
      ...(userIdentifiers.length > 0 && { userIdentifiers }),
      consent: {
        adUserData: "GRANTED",
        adPersonalization: "GRANTED",
      },
    };

    console.log("[Google Ads] Enviando conversão offline:", {
      gclid: gclid ? `${gclid.substring(0, 20)}...` : null,
      value: conversionValue,
      orderId,
      email: email ? "***" : null,
      dateTime: conversionDateTime,
    });

    // Enviar para a Google Ads API (REST)
    const apiUrl = `https://googleads.googleapis.com/v19/customers/${customerId}:uploadClickConversions`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "developer-token": developerToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversions: [clickConversion],
        partialFailure: true,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[Google Ads] Erro ao enviar conversão:", JSON.stringify(result, null, 2));
      return { success: false, error: result.error?.message || "Erro na API Google Ads", raw: result };
    }

    // Verificar falhas parciais
    if (result.partialFailureError) {
      console.warn("[Google Ads] Falha parcial:", JSON.stringify(result.partialFailureError, null, 2));
      return { success: false, error: result.partialFailureError.message, raw: result };
    }

    console.log("[Google Ads] Conversão offline enviada com sucesso!", {
      orderId,
      gclid: gclid ? "presente" : "ausente",
    });

    return { success: true, data: result };
  } catch (err) {
    console.error("[Google Ads] Exceção ao enviar conversão offline:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Função helper para formatar a data no formato esperado pelo Google Ads.
 * @param {Date} date
 * @returns {string} Ex: "2026-01-29 15:30:00-03:00"
 */
export function formatConversionDateTime(date = new Date()) {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const HH = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}${sign}${hours}:${minutes}`;
}

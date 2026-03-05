/**
 * Utilitário para capturar, persistir e recuperar parâmetros UTM e dados do Google Ads.
 * 
 * Fluxo:
 * 1. Quando o usuário chega no site via Google Ads, a URL contém params como:
 *    ?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}&utm_content=Anuncio03TOPO&gclid=xxx
 * 2. captureUtmParams() lê esses params e salva no sessionStorage + localStorage.
 * 3. getUtmParams() recupera os dados salvos (mesmo se o usuário navegar entre páginas).
 * 4. Os dados são enviados junto com o cadastro para o backend gravar no banco.
 */

export interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  gbraid: string;          // Google Ads (iOS Web-to-App)
  gad_source: string;      // Google Ads auto-tag
  gad_campaignid: string;  // Google Ads campaign ID (auto-tag)
  landing_page: string;
  referrer: string;
  captured_at: string;
}

const STORAGE_KEY = "cadbrasil_utm";

/**
 * Captura os parâmetros UTM da URL atual e persiste.
 * Deve ser chamado o mais cedo possível (App.tsx ou layout raiz).
 * Só sobrescreve se houver novos UTMs na URL (para não perder dados de uma visita anterior).
 */
export function captureUtmParams(): void {
  try {
    // Tenta extrair params da URL completa (search + hash) para cobrir redirecionamentos
    const fullUrl = window.location.href;
    const searchString = window.location.search;
    
    // Alguns redirecionamentos podem mover os params para depois do hash
    // Ex: cadbrasil.com.br/#/?utm_source=google... 
    let params = new URLSearchParams(searchString);
    
    // Se não encontrou UTMs no search, tentar extrair da URL completa
    if (!params.has("utm_source") && !params.has("gclid")) {
      const match = fullUrl.match(/[?&](utm_|gclid)/);
      if (match) {
        const queryPart = fullUrl.substring(fullUrl.indexOf(match[0]));
        params = new URLSearchParams(queryPart.startsWith("?") ? queryPart : "?" + queryPart);
      }
    }

    const hasTracking = params.has("utm_source") || params.has("utm_medium") || 
                        params.has("utm_campaign") || params.has("utm_term") || 
                        params.has("utm_content") || params.has("gclid") ||
                        params.has("gbraid") || params.has("gad_source") || 
                        params.has("gad_campaignid");
    
    if (!hasTracking) return;

    // Se não tem utm_source mas tem gclid/gad_source, preencher automaticamente
    const hasGoogleAuto = params.has("gclid") || params.has("gad_source") || params.has("gbraid");

    const utmData: UtmData = {
      utm_source: params.get("utm_source") || (hasGoogleAuto ? "google" : ""),
      utm_medium: params.get("utm_medium") || (hasGoogleAuto ? "cpc" : ""),
      utm_campaign: params.get("utm_campaign") || params.get("gad_campaignid") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || "",
      gclid: params.get("gclid") || "",
      gbraid: params.get("gbraid") || "",
      gad_source: params.get("gad_source") || "",
      gad_campaignid: params.get("gad_campaignid") || "",
      landing_page: window.location.pathname + window.location.search,
      referrer: document.referrer || "",
      captured_at: new Date().toISOString(),
    };

    const json = JSON.stringify(utmData);

    // sessionStorage: dura enquanto a aba estiver aberta
    sessionStorage.setItem(STORAGE_KEY, json);
    // localStorage: persiste mesmo se fechar o navegador (backup)
    localStorage.setItem(STORAGE_KEY, json);
    
    console.log("[UTM] Params capturados:", utmData);
  } catch (e) {
    console.warn("[UTM] Erro ao capturar params:", e);
  }
}

/**
 * Recupera os dados UTM salvos.
 * Prioriza sessionStorage (sessão atual), fallback para localStorage.
 */
export function getUtmParams(): UtmData | null {
  try {
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return JSON.parse(fromSession) as UtmData;

    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (fromLocal) return JSON.parse(fromLocal) as UtmData;
  } catch (e) {
    console.warn("[UTM] Erro ao ler params:", e);
  }
  return null;
}

/**
 * Retorna os UTMs como objeto plano para envio ao backend.
 * Se não houver UTMs, retorna objeto com campos vazios.
 */
export function getUtmForPayload(): Record<string, string> {
  const utm = getUtmParams();
  return {
    utm_source: utm?.utm_source || "",
    utm_medium: utm?.utm_medium || "",
    utm_campaign: utm?.utm_campaign || "",
    utm_term: utm?.utm_term || "",
    utm_content: utm?.utm_content || "",
    gclid: utm?.gclid || "",
    gbraid: utm?.gbraid || "",
    gad_source: utm?.gad_source || "",
    gad_campaignid: utm?.gad_campaignid || "",
    landing_page: utm?.landing_page || "",
    referrer: utm?.referrer || "",
  };
}

/**
 * Dispara evento de conversão no Google Ads (gtag).
 * @param eventName - Nome do evento (ex: 'cadastro_concluido', 'lead')
 * @param value - Valor da conversão em BRL (opcional)
 * @param extraParams - Parâmetros adicionais (opcional)
 */
export function trackConversion(
  eventName: string, 
  value?: number,
  extraParams?: Record<string, unknown>
): void {
  try {
    const utm = getUtmParams();
    
    // Google Ads gtag conversion
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      const gtagParams: Record<string, unknown> = {
        send_to: "AW-16460586067",
        ...(value !== undefined && { value, currency: "BRL" }),
        // Dados UTM como parâmetros customizados
        ...(utm?.utm_term && { keyword: utm.utm_term }),
        ...(utm?.utm_campaign && { campaign: utm.utm_campaign }),
        ...(utm?.utm_source && { source: utm.utm_source }),
        ...(utm?.gclid && { gclid: utm.gclid }),
        ...extraParams,
      };

      (window as any).gtag("event", eventName, gtagParams);
      console.log(`[Tracking] Evento '${eventName}' enviado ao Google Ads`, gtagParams);
    }

    // Google Tag Manager dataLayer
    if (typeof window !== "undefined" && Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: eventName,
        ...(value !== undefined && { conversionValue: value, currency: "BRL" }),
        utmSource: utm?.utm_source || "",
        utmMedium: utm?.utm_medium || "",
        utmCampaign: utm?.utm_campaign || "",
        utmTerm: utm?.utm_term || "",
        utmContent: utm?.utm_content || "",
        gclid: utm?.gclid || "",
      });
      console.log(`[Tracking] Evento '${eventName}' enviado ao GTM dataLayer`);
    }

    // Microsoft Ads (UET)
    if (typeof window !== "undefined" && Array.isArray((window as any).uetq)) {
      (window as any).uetq.push("event", eventName, {
        revenue_value: value || 0,
        currency: "BRL",
      });
      console.log(`[Tracking] Evento '${eventName}' enviado ao Microsoft Ads`);
    }
  } catch (e) {
    console.warn("[Tracking] Erro ao disparar evento:", e);
  }
}

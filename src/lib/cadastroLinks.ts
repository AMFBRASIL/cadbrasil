import { getUtmParams } from "./utm";

const CADASTRO_ORIGIN = "https://cadastro.cadbrasil.com.br";

/** Chaves repassadas ao subdomínio de cadastro (chegada por anúncio + clique atual). */
const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "gad_source",
  "gad_campaignid",
  "msclkid",
] as const;

function trimVal(v: string | null | undefined): string | null {
  if (v == null || typeof v !== "string") return null;
  const t = v.trim();
  return t || null;
}

/** Valores salvos na sessão (primeira URL com tracking na visita). */
function pickFromStoredSession(): Record<string, string> {
  const out: Record<string, string> = {};
  const utm = getUtmParams();
  if (!utm) return out;
  for (const key of TRACKING_KEYS) {
    const raw = utm[key as keyof typeof utm];
    const t = trimVal(typeof raw === "string" ? raw : "");
    if (t) out[key] = t;
  }
  return out;
}

/** Sobrescreve com o que estiver na URL **neste momento** (último clique / página atual). */
function overlayFromCurrentUrl(merged: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    const live = new URLSearchParams(window.location.search);
    for (const key of TRACKING_KEYS) {
      const t = trimVal(live.get(key));
      if (t) merged[key] = t;
    }
  } catch {
    /* ignore */
  }
}

/**
 * URL do cadastro com atribuição dinâmica:
 * - `utm_*`, `gclid`, `gbraid`, `gad_*`, `msclkid`: vindos da captura na chegada (`captureUtmParams` / storage)
 *   e atualizados pelo que existir na query string da página atual.
 * - `cadbrasil_cta`: identificador fixo do botão/seção neste site (não substitui `utm_content` do anúncio).
 */
export function cadastroOutboundUrl(placement: string): string {
  const merged = pickFromStoredSession();
  overlayFromCurrentUrl(merged);

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) {
    params.set(k, v);
  }

  const p = trimVal(placement);
  if (p) params.set("cadbrasil_cta", p);

  const qs = params.toString();
  if (qs) return `${CADASTRO_ORIGIN}?${qs}`;
  return CADASTRO_ORIGIN;
}

-- Adicionar coluna ProtocoloCadbrasil (se não existir)
-- e colunas de rastreamento UTM na tabela tbl_smart_clientes
-- Para rastrear de qual campanha/palavra-chave do Google Ads veio cada cliente.

-- Coluna de protocolo (caso não exista no banco)
ALTER TABLE tbl_smart_clientes
  ADD COLUMN IF NOT EXISTS ProtocoloCadbrasil VARCHAR(50) DEFAULT NULL COMMENT 'Protocolo gerado pelo CADBRASIL' AFTER sourcePage;

-- Colunas de rastreamento UTM / Google Ads
ALTER TABLE tbl_smart_clientes
  ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255) DEFAULT NULL COMMENT 'Origem (google, bing, facebook, etc.)' AFTER ProtocoloCadbrasil,
  ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255) DEFAULT NULL COMMENT 'Mídia (cpc, organic, email, etc.)' AFTER utm_source,
  ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255) DEFAULT NULL COMMENT 'ID/Nome da campanha' AFTER utm_medium,
  ADD COLUMN IF NOT EXISTS utm_term VARCHAR(500) DEFAULT NULL COMMENT 'Palavra-chave do Google Ads' AFTER utm_campaign,
  ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255) DEFAULT NULL COMMENT 'Variação do anúncio (ex: Anuncio03TOPO)' AFTER utm_term,
  ADD COLUMN IF NOT EXISTS gclid VARCHAR(500) DEFAULT NULL COMMENT 'Google Click ID (para conversões offline)' AFTER utm_content,
  ADD COLUMN IF NOT EXISTS gbraid VARCHAR(500) DEFAULT NULL COMMENT 'Google Ads cross-domain click ID (iOS)' AFTER gclid,
  ADD COLUMN IF NOT EXISTS gad_source VARCHAR(50) DEFAULT NULL COMMENT 'Google Ads auto-tag source' AFTER gbraid,
  ADD COLUMN IF NOT EXISTS gad_campaignid VARCHAR(100) DEFAULT NULL COMMENT 'Google Ads campaign ID (auto-tag)' AFTER gad_source,
  ADD COLUMN IF NOT EXISTS landing_page VARCHAR(1000) DEFAULT NULL COMMENT 'Página de entrada do usuário' AFTER gad_campaignid,
  ADD COLUMN IF NOT EXISTS referrer VARCHAR(1000) DEFAULT NULL COMMENT 'URL de referência (de onde veio)' AFTER landing_page;

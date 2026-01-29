-- Idempotência de boleto: evita "mais de três cobranças idênticas" (Efí/Gerencianet).
-- Reutiliza boleto já criado para o mesmo IdPedido + ValorCentavos.
CREATE TABLE IF NOT EXISTS tbl_smart_boleto (
  IdPedido INT NOT NULL,
  ValorCentavos INT NOT NULL,
  GerencianetChargeId BIGINT NOT NULL,
  BoletoLink VARCHAR(500) NOT NULL,
  BoletoPdf VARCHAR(500) NULL,
  BoletoBarcode VARCHAR(200) NULL,
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (IdPedido, ValorCentavos)
);

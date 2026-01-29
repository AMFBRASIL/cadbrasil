# Migrações do banco de dados

Execute os arquivos `.sql` na ordem (001, 002, …) no mesmo banco usado pela API.

## 001_tbl_smart_boleto.sql

Cria a tabela `tbl_smart_boleto` para **idempotência do boleto** (evitar o erro "Não é possível emitir mais de três cobranças idênticas" da Efí/Gerencianet).

**Como rodar:**

```bash
mysql -h HOST -u USER -p DATABASE < server/migrations/001_tbl_smart_boleto.sql
```

Ou no MySQL/phpMyAdmin:

```sql
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
```

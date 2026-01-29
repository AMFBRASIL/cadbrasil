# Certificados Gerencianet

Coloque aqui o **certificado .p12** da sua conta Gerencianet (Efipay).

- **Arquivo:** ex.: `certificado.p12` ou `homologacao.p12`
- **Onde obter:** painel Gerencianet → API → Certificado
- **Uso:** **obrigatório para PIX** (sandbox e produção). Boleto usa apenas client_id/secret.

No `server/.env` use o caminho relativo à pasta `server`:

```env
GERENCIANET_CERTIFICATE_PATH=certificados/certificado.p12
```

**Importante:** arquivos `.p12` não são versionados no Git (estão no `.gitignore`).

---

## Erro "Forbidden" (403) ao gerar PIX ou boleto

1. **Certificado:** PIX exige o .p12. Coloque o arquivo em `server/certificados/` e configure `GERENCIANET_CERTIFICATE_PATH`.
2. **Sandbox vs produção (muito comum):**
   - `GERENCIANET_SANDBOX=true` → use **certificado de homologação** e **credenciais de homologação** (client_id/client_secret do painel em modo teste).
   - `GERENCIANET_SANDBOX=false` → use **certificado de produção** e **credenciais de produção**.
   - Não misture: certificado de produção com sandbox=true ou o inverso gera **Forbidden**.
3. **Credenciais:** Confira `GERENCIANET_CLIENT_ID` e `GERENCIANET_CLIENT_SECRET` no painel Gerencianet (homologação vs produção).
4. **Chave PIX:** Defina `GERENCIANET_PIX_KEY` (ex.: `pix@cadbrasil.com.br`) e garanta que está cadastrada na Gerencianet naquele ambiente (homolog/produção).
5. **CPF/CNPJ:** O pagador precisa ter CPF (11 dígitos) ou CNPJ (14 dígitos) válidos.

---

## Erro 404 "Not Found" / "invalid_request" ao gerar PIX

1. **Chave PIX não cadastrada:** A chave em `GERENCIANET_PIX_KEY` (ex.: `pix@cadbrasil.com.br`) precisa estar **cadastrada** na conta Gerencianet do ambiente em uso (produção ou homologação). E-mail, celular, CPF/CNPJ ou chave aleatória (EVP) — use uma que exista no painel.
2. **Escopos da aplicação PIX:** No painel Gerencianet → API → Sua aplicação → Escopos, confira se **`cob.write`** (e, se existir, `pix_write`) está ativo. Cobrança imediata exige `cob.write`.
3. **Ambiente:** Produção vs homologação — a chave e os escopos valem por ambiente. Use a chave do mesmo ambiente do certificado e das credenciais.

O backend loga a chave usada ao falhar com 404 (`[Gerencianet] PIX ERRO 404 ...`) e devolve mensagem detalhada em desenvolvimento.

---

**Como debugar:**

1. **Diagnóstico OAuth:** Chame `GET /api/gerencianet/diagnostico`. Se retornar `ok: false`, o Forbidden vem da **autenticação** (certificado + client_id/secret ou sandbox vs produção). Se `ok: true`, o problema está na chamada de cobrança PIX (ex.: chave PIX, payload).
2. **Diagnóstico OAuth + POST /v2/cob (404):** Chame `GET /api/gerencianet/diagnostico-cob`. Faz OAuth + `POST /v2/cob` com body mínimo (valor 0.01, devedor teste). Retorna `oauthOk`, `cobStatus`, `cobResponse`, `request` (url, bodyKeys, chave). Se `cobStatus === 404`, confira chave PIX e escopo `cob.write`; se `cobStatus === 201`, a cobrança PIX está ok e o 404 no fluxo real pode ser payload ou outro detalhe.
3. **Erro completo (raw):** Com `NODE_ENV=development`, o backend inclui o objeto `raw` da Gerencianet na resposta 500 de `gerar-pix`/`gerar-boleto`. Abra o **Network** do navegador (aba Resposta) ou o **console** (o frontend loga `[API] Gerencianet PIX – erro completo (raw): ...` em dev).
4. **Log do servidor:** O backend também loga `[Gerencianet] Erro ao gerar PIX (raw):` no terminal ao falhar.

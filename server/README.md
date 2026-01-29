# API Cadastro CADBRASIL

Backend Express + MySQL para o formulário de cadastro SICAF.

## Pré-requisitos

1. **MySQL**: executar o script de alteração em `../scripts/alter_tbl_smart_clientes_protocolo.sql` na base de dados (adiciona `ProtocoloCadbrasil` e `NomeFantasia` em `tbl_smart_clientes`).

2. **Node.js** 18+.

## Instalação

```bash
cd server
npm install
```

## Configuração

Copiar `.env.example` para `.env` e ajustar:

```bash
cp .env.example .env
```

Variáveis:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` — conexão MySQL.
- `PORT` — porta da API (padrão `3013`).
- `CORS_ORIGINS` — origens permitidas (ex.: `http://localhost:8080,http://localhost:5173`).
- `RECEITAWS_API_TOKEN` — token da API ReceitaWS para consulta de CNPJ.
- `EMAIL_API_URL` — URL da API de email externa (padrão: `https://send.cadbr.com.br/sendCron`).
- `EMAIL_NOTIFICATION_EMAIL` — email para receber notificações internas (opcional).

## Execução

```bash
npm run dev   # desenvolvimento (watch)
npm start     # produção
```

A API sobe em `http://localhost:3013`. O frontend usa `VITE_API_URL` (ex.: `http://localhost:3013`) para chamar a API.

## Endpoints

- `GET /health` — health check.
- `GET /api/cnpj/:cnpj` — busca dados do CNPJ na ReceitaWS (proxy para evitar CORS).
- `POST /api/cadastro` — envio do formulário de cadastro. Body JSON com os campos do formulário. Resposta: `{ success, protocolo, idCliente, idUsuario }` ou `{ success: false, error }`.
  - Após cadastro bem-sucedido, envia automaticamente email de confirmação via API externa.

## Serviços

### Email (API Externa)

O sistema envia automaticamente:
- **Email de confirmação** para o cliente após cadastro bem-sucedido (com protocolo e instruções).
- **Email de notificação interna** (opcional) para o email configurado em `EMAIL_NOTIFICATION_EMAIL`.

**Nota:** Se a API de email não estiver configurada, o cadastro ainda será processado normalmente, mas os emails não serão enviados (apenas log de aviso).

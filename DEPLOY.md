# Guia de Deploy para Produção - CADBRASIL

## 📋 Checklist Pré-Deploy

### 1. **Variáveis de Ambiente - Frontend**

Criar arquivo `.env` na raiz do projeto com:

```env
VITE_API_URL=https://api.cadbr.com.br
```

**⚠️ IMPORTANTE:** Substitua `https://api.cadbr.com.br` pelo domínio real da sua API em produção.

### 2. **Variáveis de Ambiente - Backend**

Atualizar `server/.env` com as configurações de produção:

```env
# Banco MySQL (já configurado)
DB_HOST=193.203.175.71
DB_PORT=3306
DB_USER=u460638534_adm
DB_PASSWORD=3IoMI5r*Mu3#
DB_NAME=u460638534_adm

# API
PORT=3013
NODE_ENV=production

# CORS - IMPORTANTE: Adicionar domínio de produção
CORS_ORIGINS=https://cadbr.com.br,https://www.cadbr.com.br,https://cadastro.cadbr.com.br

# API ReceitaWS
RECEITAWS_API_TOKEN=f7cb99c733f15a371777cfd0844156fabfbdee28ec6920e305f2edaf1fc5d022

# API de Email Externa
EMAIL_API_URL=https://send.cadbr.com.br/sendCron
EMAIL_NOTIFICATION_EMAIL=admin@cadbr.com.br
```

**⚠️ IMPORTANTE:** 
- Atualize `CORS_ORIGINS` com os domínios reais do frontend em produção
- Verifique se `NODE_ENV=production`
- Confirme que as credenciais do banco estão corretas

### 3. **Build do Frontend**

```bash
# Na raiz do projeto
npm run build
```

Isso criará a pasta `dist/` com os arquivos otimizados para produção.

### 4. **Instalar Dependências do Backend**

```bash
# Na pasta server/
cd server
npm install --production
```

### 5. **Verificar Configurações de Segurança**

- ✅ Arquivos `.env` estão no `.gitignore` (já configurado)
- ✅ Senhas e tokens não estão hardcoded no código
- ✅ CORS configurado apenas para domínios permitidos

### 6. **Testar Conexão com Banco de Dados**

O backend já tem um endpoint de health check:

```bash
curl http://localhost:3013/health
```

Deve retornar:
```json
{
  "ok": true,
  "database": "connected",
  "timestamp": "..."
}
```

## 🚀 Processo de Deploy

### Opção 1: Deploy Manual

#### Frontend (Vite/React)
1. Execute `npm run build` na raiz
2. Faça upload da pasta `dist/` para o servidor web (nginx, Apache, etc.)
3. Configure o servidor web para servir os arquivos estáticos
4. Configure redirecionamento para `index.html` (SPA routing)

#### Backend (Node.js/Express)
1. Faça upload da pasta `server/` para o servidor
2. Instale dependências: `npm install --production`
3. Configure o arquivo `.env` com as variáveis de produção
4. Use um process manager como PM2:
   ```bash
   npm install -g pm2
   pm2 start server/index.js --name cadbrasil-api
   pm2 save
   pm2 startup
   ```

### Opção 2: Usando PM2 (Recomendado)

#### Backend
```bash
cd server
npm install --production
pm2 start index.js --name cadbrasil-api --env production
pm2 save
```

#### Frontend
- Build e deploy da pasta `dist/` no servidor web

## 📝 Configuração do Nginx (Exemplo)

```nginx
# Frontend
server {
    listen 80;
    server_name cadbr.com.br www.cadbr.com.br;
    
    root /var/www/cadbrasil/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Backend API
server {
    listen 80;
    server_name api.cadbr.com.br;
    
    location / {
        proxy_pass http://localhost:3013;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## ✅ Pós-Deploy

1. **Testar Endpoints da API:**
   - `GET /health` - Verificar conexão com banco
   - `POST /api/cadastro` - Testar cadastro completo
   - `GET /api/cnpj/:cnpj` - Testar busca de CNPJ
   - `POST /api/renovacao/verificar` - Testar verificação de renovação

2. **Testar Frontend:**
   - Acessar a página de cadastro
   - Testar busca de CNPJ
   - Testar busca de CEP
   - Testar fluxo completo de cadastro
   - Verificar se os indicadores de segurança aparecem

3. **Monitoramento:**
   - Verificar logs do PM2: `pm2 logs cadbrasil-api`
   - Monitorar erros no console do navegador
   - Verificar logs do servidor web

## 🔒 Segurança

- ✅ Nunca commite arquivos `.env`
- ✅ Use HTTPS em produção
- ✅ Configure firewall para permitir apenas portas necessárias
- ✅ Mantenha dependências atualizadas
- ✅ Configure rate limiting no backend (recomendado)

## 📞 Troubleshooting

### Erro de CORS
- Verifique se o domínio do frontend está em `CORS_ORIGINS` no `.env` do backend

### Erro de conexão com banco
- Verifique credenciais no `.env`
- Verifique se o IP do servidor está liberado no MySQL
- Teste conexão: `mysql -h HOST -u USER -p`

### Frontend não carrega
- Verifique se a URL da API está correta no `.env` do frontend
- Verifique console do navegador para erros
- Verifique se o build foi feito corretamente

## 📦 Estrutura de Arquivos para Deploy

```
/
├── dist/                    # Frontend build (upload para servidor web)
├── server/                  # Backend (upload para servidor Node.js)
│   ├── .env                 # Variáveis de ambiente (NÃO commitar)
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   └── package.json
└── .env                     # Frontend env (NÃO commitar)
```

#!/usr/bin/env node
/**
 * Script de diagnóstico rápido para produção
 * Executa: node check-producao.js
 */

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== DIAGNÓSTICO PRODUÇÃO - CADBRASIL ===\n");

// 1. Verificar variáveis de ambiente
console.log("1. Variáveis de Ambiente:");
console.log(`   NODE_ENV: ${process.env.NODE_ENV || "não definido"}`);
console.log(`   PORT_PROD: ${process.env.PORT_PROD || "não definido"}`);
console.log(`   GERENCIANET_SANDBOX: ${process.env.GERENCIANET_SANDBOX || "não definido"}`);
console.log(`   GERENCIANET_CLIENT_ID: ${process.env.GERENCIANET_CLIENT_ID ? "✓ definido" : "✗ não definido"}`);
console.log(`   GERENCIANET_CLIENT_SECRET: ${process.env.GERENCIANET_CLIENT_SECRET ? "✓ definido" : "✗ não definido"}`);
console.log(`   GERENCIANET_PIX_KEY: ${process.env.GERENCIANET_PIX_KEY || "não definido"}`);
console.log(`   GERENCIANET_CERTIFICATE_PATH: ${process.env.GERENCIANET_CERTIFICATE_PATH || "não definido"}`);

// 2. Verificar certificado
console.log("\n2. Certificado .p12:");
const certPathEnv = process.env.GERENCIANET_CERTIFICATE_PATH;
if (certPathEnv) {
  const certPath = path.resolve(__dirname, certPathEnv);
  console.log(`   Caminho esperado: ${certPath}`);
  
  if (fs.existsSync(certPath)) {
    const stats = fs.statSync(certPath);
    console.log(`   ✓ Arquivo existe`);
    console.log(`   Tamanho: ${stats.size} bytes`);
    
    if (stats.size < 200) {
      console.log(`   ⚠ AVISO: Arquivo muito pequeno (possível corrompido)`);
    } else {
      console.log(`   ✓ Tamanho OK`);
    }
  } else {
    console.log(`   ✗ Arquivo NÃO encontrado!`);
    console.log(`   Verifique se o arquivo está em: ${certPath}`);
  }
} else {
  console.log(`   ✗ GERENCIANET_CERTIFICATE_PATH não definido no .env`);
}

// 3. Verificar configuração de produção
console.log("\n3. Configuração de Produção:");
const isProd = process.env.NODE_ENV === "production";
const isSandbox = process.env.GERENCIANET_SANDBOX === "true";

if (isProd && isSandbox) {
  console.log(`   ⚠ AVISO: NODE_ENV=production mas GERENCIANET_SANDBOX=true`);
  console.log(`   Use GERENCIANET_SANDBOX=false em produção`);
} else if (isProd && !isSandbox) {
  console.log(`   ✓ Configuração correta para produção`);
} else if (!isProd && !isSandbox) {
  console.log(`   ⚠ AVISO: NODE_ENV não é 'production' mas GERENCIANET_SANDBOX=false`);
  console.log(`   Certifique-se de usar certificado de PRODUÇÃO`);
}

// 4. Verificar porta
console.log("\n4. Porta do Servidor:");
const port = isProd ? process.env.PORT_PROD : process.env.PORT_DEV;
console.log(`   Porta esperada: ${port || "não definida"}`);

// 5. Verificar CORS
console.log("\n5. CORS:");
const corsOrigins = process.env.CORS_ORIGINS || "";
const hasProdOrigin = corsOrigins.includes("cadbrasil.com.br");
console.log(`   Origens permitidas: ${corsOrigins || "não definido"}`);
if (hasProdOrigin) {
  console.log(`   ✓ Inclui cadbrasil.com.br`);
} else {
  console.log(`   ⚠ AVISO: Não inclui cadbrasil.com.br`);
}

// 6. Resumo
console.log("\n=== RESUMO ===");
const issues = [];

if (!process.env.GERENCIANET_CLIENT_ID || !process.env.GERENCIANET_CLIENT_SECRET) {
  issues.push("Credenciais Gerencianet não configuradas");
}

if (!certPathEnv || !fs.existsSync(path.resolve(__dirname, certPathEnv))) {
  issues.push("Certificado .p12 não encontrado");
}

if (isProd && isSandbox) {
  issues.push("SANDBOX=true em produção (deve ser false)");
}

if (!hasProdOrigin) {
  issues.push("CORS não inclui cadbrasil.com.br");
}

if (issues.length === 0) {
  console.log("✓ Todas as verificações passaram!");
  console.log("\nPróximos passos:");
  console.log("1. Teste: curl https://cadbrasil.com.br/api/gerencianet/diagnostico-cob");
  console.log("2. Verifique os logs do backend ao tentar gerar PIX/boleto");
} else {
  console.log("✗ Problemas encontrados:");
  issues.forEach((issue, i) => {
    console.log(`   ${i + 1}. ${issue}`);
  });
}

console.log("\n=== FIM DO DIAGNÓSTICO ===");

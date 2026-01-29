import "dotenv/config";
import express from "express";
import cors from "cors";
import cadastroRoutes from "./routes/cadastro.js";
import { testConnection } from "./db.js";

const app = express();

// Porta baseada no ambiente: NODE_ENV=development usa PORT_DEV, production usa PORT_PROD
const isDev = process.env.NODE_ENV !== "production";
const PORT = Number(isDev ? process.env.PORT_DEV : process.env.PORT_PROD) || (isDev ? 3001 : 3013);

// Testar conexão com MySQL na inicialização
testConnection().catch((err) => {
  console.error("[STARTUP] Falha ao testar conexão MySQL:", err.message);
});

// CORS liberado para todos os hosts (sem restrição por origem)
console.log("[CORS] Liberado para todos os hosts");

app.use(
  cors({
    origin: true, // reflete a origin da requisição (aceita qualquer host)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json());

app.use("/api", cadastroRoutes);

app.get("/health", async (_, res) => {
  const dbConnected = await testConnection();
  res.json({
    ok: true,
    database: dbConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[cadbrasil-api] http://localhost:${PORT} (${isDev ? "development" : "production"})`);
});

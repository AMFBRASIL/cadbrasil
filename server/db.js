import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Opções adicionais para melhor compatibilidade
  ssl: false, // Desabilitar SSL se não configurado
  connectTimeout: 10000, // 10 segundos - timeout para estabelecer conexão
  // Permitir múltiplas queries (se necessário)
  multipleStatements: false,
});

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export async function getConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error("[DB] Erro ao obter conexão:", {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
    });
    throw error;
  }
}

/**
 * Testa a conexão com o banco de dados
 */
export async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("[DB] Conexão com MySQL estabelecida com sucesso");
    return true;
  } catch (error) {
    console.error("[DB] Erro ao conectar com MySQL:", {
      message: error.message,
      code: error.code,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    });
    return false;
  }
}

export default pool;

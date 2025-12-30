import sql from "mssql";

// Configuration for SQL Server
// Parse server and port from DB_SERVER environment variable
// Supports formats: "server,port" or "server\instance,port" or "server\instance" or "server"
const parseServerConfig = () => {
  const dbServer = process.env.DB_SERVER || "195.250.21.164";
  const dbPort = process.env.DB_PORT;

  let server = dbServer;
  let port: number | undefined;
  let instance: string | undefined;

  // Check for port in format: server,port or server\instance,port
  if (dbServer.includes(",")) {
    const parts = dbServer.split(",");
    server = parts[0].trim();
    port = parseInt(parts[1].trim());
  }

  // Check for instance name in format: server\instance
  if (server.includes("\\")) {
    const parts = server.split("\\");
    server = parts[0].trim();
    instance = parts[1].trim();
  }

  const result: any = { server };
  if (port) result.port = port;
  if (instance) result.options = { ...result.options, instanceName: instance };
  if (dbPort && !port) result.port = parseInt(dbPort);

  return result;
};

const serverConfig = parseServerConfig();

const config: sql.config = {
  server: serverConfig.server,
  ...(serverConfig.port && { port: serverConfig.port }),
  database: process.env.DB_DATABASE || "Soul_CRM",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "Soulsoft@123",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    ...(serverConfig.options?.instanceName && {
      instanceName: serverConfig.options.instanceName,
    }),
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    // Close existing pool if not connected
    if (pool && !pool.connected) {
      try {
        await pool.close();
      } catch (e) {
        // Ignore close errors
      }
      pool = null;
    }

    console.log(
      "🔄 Connecting to SQL Server:",
      config.server,
      "Database:",
      config.database
    );
    pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server successfully");
    return pool;
  } catch (error) {
    console.error("❌ Database connection error:", error);
    console.error(
      "📋 Connection details - Server:",
      config.server,
      "Database:",
      config.database,
      "User:",
      config.user
    );
    pool = null;
    throw new Error(
      `Database connection failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }. Please ensure SQL Server is running and accessible.`
    );
  }
}

export async function closeConnection(): Promise<void> {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log("Connection closed");
    }
  } catch (error) {
    console.error("Error closing connection:", error);
    throw error;
  }
}

export { sql };

// // import sql, { config as SqlConfig } from "mssql";

// // // Parse server and port from DB_SERVER environment variable
// // const parseServerConfig = () => {
// //   const dbServer = process.env.DB_SERVER || "195.250.21.164";
// //   const dbPort = process.env.DB_PORT;

// //   let server = dbServer;
// //   let port: number | undefined;
// //   let instanceName: string | undefined;

// //   // server,port format
// //   if (dbServer.includes(",")) {
// //     const parts = dbServer.split(",");
// //     server = parts[0].trim();
// //     port = parseInt(parts[1].trim(), 10);
// //   }

// //   // server\instance format
// //   if (server.includes("\\")) {
// //     const parts = server.split("\\");
// //     server = parts[0].trim();
// //     instanceName = parts[1].trim();
// //   }

// //   // override port if DB_PORT exists
// //   if (dbPort && !port) port = parseInt(dbPort, 10);

// //   return { server, port, instanceName };
// // };

// // const serverConfig = parseServerConfig();

// // const config: SqlConfig = {
// //   server: serverConfig.server,
// //   port: serverConfig.port,
// //   database: process.env.DB_DATABASE || "Soul_CRM",
// //   user: process.env.DB_USER || "sa",
// //   password: process.env.DB_PASSWORD || "Soulsoft@123",
// //   options: {
// //     encrypt: false,
// //     trustServerCertificate: true,
// //     enableArithAbort: true,
// //     ...(serverConfig.instanceName && { instanceName: serverConfig.instanceName }),
// //   },
// //   connectionTimeout: 30000,
// //   requestTimeout: 30000,
// //   pool: {
// //     max: 10,
// //     min: 0,
// //     idleTimeoutMillis: 30000,
// //   },
// // };

// // let pool: sql.ConnectionPool | null = null;

// // export async function getConnection(): Promise<sql.ConnectionPool> {
// //   if (pool && pool.connected) return pool;

// //   if (pool && !pool.connected) {
// //     try {
// //       await pool.close();
// //     } catch (e) {
// //       // ignore
// //     }
// //     pool = null;
// //   }

// //   console.log("🔄 Connecting to SQL Server:", config.server, "Database:", config.database);

// //   try {
// //     pool = await sql.connect(config);
// //     console.log("✅ Connected to SQL Server successfully");
// //     return pool;
// //   } catch (error) {
// //     console.error("❌ Database connection error:", error);
// //     pool = null;
// //     throw new Error(
// //       `Database connection failed: ${
// //         error instanceof Error ? error.message : "Unknown error"
// //       }. Ensure SQL Server is running and accessible.`
// //     );
// //   }
// // }

// // export async function closeConnection(): Promise<void> {
// //   if (pool) {
// //     await pool.close();
// //     pool = null;
// //     console.log("Connection closed");
// //   }
// // }

// // export { sql };
// import sql, { config as SqlConfig } from "mssql";

// // Parse server and port from environment
// const parseServerConfig = () => {
//   const dbServer = process.env.DB_SERVER || "195.250.21.164";
//   const dbPort = process.env.DB_PORT;

//   let server = dbServer;
//   let port: number | undefined;
//   let instanceName: string | undefined;

//   if (dbServer.includes(",")) {
//     const parts = dbServer.split(",");
//     server = parts[0].trim();
//     port = parseInt(parts[1].trim(), 10);
//   }

//   if (server.includes("\\")) {
//     const parts = server.split("\\");
//     server = parts[0].trim();
//     instanceName = parts[1].trim();
//   }

//   if (dbPort && !port) port = parseInt(dbPort, 10);

//   return { server, port, instanceName };
// };

// const serverConfig = parseServerConfig();

// const config: SqlConfig = {
//   server: serverConfig.server,
//   port: serverConfig.port,
//   database: process.env.DB_DATABASE || "Soul_CRM",
//   user: process.env.DB_USER || "sa",
//   password: process.env.DB_PASSWORD || "Soulsoft@123",
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//     enableArithAbort: true,
//     ...(serverConfig.instanceName && { instanceName: serverConfig.instanceName }),
//   },
//   connectionTimeout: 30000,
//   requestTimeout: 30000,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
// };

// let pool: sql.ConnectionPool | null = null;

// /**
//  * Safe connection to SQL Server.
//  * Returns null if server is unreachable instead of throwing 500.
//  */
// export async function getConnection(): Promise<sql.ConnectionPool | null> {
//   if (pool && pool.connected) return pool;

//   if (pool && !pool.connected) {
//     try {
//       await pool.close();
//     } catch {}
//     pool = null;
//   }

//   console.log("🔄 Connecting to SQL Server:", config.server, "Database:", config.database);

//   try {
//     pool = await sql.connect(config);
//     console.log("✅ SQL Server connected");
//     return pool;
//   } catch (error: any) {
//     console.error("❌ SQL Connection FAILED:", error.message || error);
//     pool = null;
//     // Return null instead of throwing to prevent 500
//     return null;
//   }
// }

// export async function closeConnection(): Promise<void> {
//   if (pool) {
//     await pool.close();
//     pool = null;
//     console.log("Connection closed");
//   }
// }

// export { sql };
import sql, { config as SqlConfig } from "mssql";

// Parse server and port from environment
const parseServerConfig = () => {
  const dbServer = process.env.DB_SERVER || "195.250.21.164";
  const dbPort = process.env.DB_PORT;

  let server = dbServer;
  let port: number | undefined;
  let instanceName: string | undefined;

  if (dbServer.includes(",")) {
    const parts = dbServer.split(",");
    server = parts[0].trim();
    port = parseInt(parts[1].trim(), 10);
  }

  if (server.includes("\\")) {
    const parts = server.split("\\");
    server = parts[0].trim();
    instanceName = parts[1].trim();
  }

  if (dbPort && !port) port = parseInt(dbPort, 10);

  return { server, port, instanceName };
};

const serverConfig = parseServerConfig();

const config: SqlConfig = {
  server: serverConfig.server,
  port: serverConfig.port,
  database: process.env.DB_DATABASE || "Soul_CRM",
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "Soulsoft@123",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    ...(serverConfig.instanceName && { instanceName: serverConfig.instanceName }),
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

/**
 * Safe connection to SQL Server.
 * Always throws error if connection fails.
 */
export async function getConnection(): Promise<sql.ConnectionPool> {
  if (pool && pool.connected) return pool;

  if (pool && !pool.connected) {
    try {
      await pool.close();
    } catch {}
    pool = null;
  }

  console.log("🔄 Connecting to SQL Server:", config.server, "Database:", config.database);

  try {
    const newPool = await sql.connect(config);
    console.log("✅ SQL Server connected");
    pool = newPool;
    return pool;
  } catch (error: any) {
    console.error("❌ SQL Connection FAILED:", error.message || error);
    throw new Error("SQL Server unreachable — check IP, port 1433, firewall, or SQL services.");
  }
}

export async function closeConnection(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
    console.log("Connection closed");
  }
}

export { sql };

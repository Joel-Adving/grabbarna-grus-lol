import mysql from 'mysql2'

const global = globalThis as unknown as { mySqlPool: mysql.Pool }

if (!global.mySqlPool) {
  global.mySqlPool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  })
}

const pool = global.mySqlPool.promise()

export { pool }

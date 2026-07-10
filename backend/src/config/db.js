const mysql = require("mysql2");

let pool;

if (process.env.DATABASE_URL) {
    // Production connection string (e.g. Railway, Render, Heroku)
    pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required by many production DB providers (e.g. Aiven)
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} else {
    // Fallback to separate variables (Local development)
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

pool.getConnection((err, conn) => {
    if (err) {
        console.error("Database Connection Failed:", err);
    } else {
        console.log("MySQL Database Connected Successfully (Connection Pool)");
        conn.release();
    }
});

module.exports = pool;
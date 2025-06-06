// load required module for connection establishment
import mysql from "mysql2/promise";
import { decryptPassword } from "../utils/encrypt.js";
/**
 * This method creates a pool of connections with the specified user name, password.
 * A pool is typically created once during application initialization.
 */
export const getConnection = mysql.createPool({
    host: process.env.NODE_MYSQL_IP,
    user: process.env.MYSQL_USER,
    password: decryptPassword(process.env.NODE_MYSQL_PASSWORD),
    database: process.env.MYSQL_SCHEMA,
    waitForConnections: true,
    connectionLimit: 4, // 4 concurrent connections
    maxIdle: 4, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 20000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});



import * as dotenv from 'dotenv';
import mysql from "mysql2/promise";
import { decryptPassword } from '../utils/encrypt.js';
dotenv.config();
/**
 * execute method is responsible to run or execute sql query
 */
export const execute = async ({
    query,
    bind,
    connection = {}
}) => {
    try {
        const allConnections = connection.pool?._allConnections.length ?? connection.connection._pool?._allConnections.length;
        if (allConnections == 0) {
            connection = await mysql.createConnection({
                host: process.env.NODE_MYSQL_IP,
                user: process.env.MYSQL_USER,
                password: decryptPassword(process.env.NODE_MYSQL_PASSWORD),
                database: process.env.MYSQL_SCHEMA
            })
        }
        return await connection.execute(query, bind)
    } catch (error) {
        throw new Error(error.message);
    }
}

import { execute } from "../execute.js";

/**
 * class sql responsible for sql method
 */
export class Sql {
    /**
     * @returns  insert data into db
     */
    static async add({
        tableName,
        columnName,
        mapColumnName,
        data,
        tableSchema,
        connection,
        autoCommit = true,
        isMaster = false,
        isDML = true,
        isMercury = false
    }) {
        let query;
        if (!isMaster) {
            query = `INSERT INTO ${tableName} (${columnName}) VALUES (${mapColumnName})`
        }
        else { // if master screen
            query = `INSERT INTO ${tableName} VALUES (${mapColumnName})`
        }
        const options = {
            autoCommit,
            bindDefs: tableSchema,
        }
        return execute({ query, data, options, isDML, connection, isMercury })
    }

    static async addSQL({ tableName, columnName, data, connection, placeholders }) {
        const query = `INSERT INTO ${tableName} (${columnName}) VALUES ${placeholders}`
        return execute({ query, bind: data, connection })
    }
    /*
     * @returns gives object based on select result
     */
    static async find({
        tableName,
        where = '',
        selectColumn,
        bind = [],
        connection }) {
        let query
        if (where) {
            query = `SELECT ${selectColumn} FROM ${tableName} WHERE ${where}`
        }
        else {
            query = `SELECT ${selectColumn} FROM ${tableName}`
        }
        return execute({ query, bind, connection })
    }

    static async leftJoin({ selectColumn, where = '', tableName1, connection, tableName2, joinCondition, bind = {}, isMercury = false }) {
        const query = `SELECT ${selectColumn} FROM ${tableName1} LEFT JOIN ${tableName2} ON ${joinCondition} WHERE ${where}`
        return execute({ query, bind, connection, isMercury })
    }

    static async delete({ where = '', tableName, data = {}, connection, autoCommit = true, isMercury = false }) {
        let query
        const options = {
            autoCommit,
        }
        if (where) {
            query = `DELETE FROM ${tableName} WHERE ${where}`
            return execute({ query, data, options, isDML: true, connection, isMercury })
        }
        // logger.info(`Deleting all Data from table ${tableName}`)
        query = `DELETE FROM ${tableName}`
        return execute({ query, data: [[]], options, isDML: true, connection, isMercury })  // check why data is as [[]]
    }
    static async deleteSQL({ where = '', tableName, data, connection, placeholders }) {
        //DELETE FROM my_table WHERE (a,b) IN ((1,2), (4,5), (7,8)) a, b is pkey... data= [[[4,6],[4,7],[5,8]]]
        const query = `DELETE FROM ${tableName} WHERE (${where}) IN ${placeholders}`
        return execute({ query, bind: data, connection })
    }

    static async update({ where, tableName, setMapping, data = [{}], connection, autoCommit = true, isMercury = false }) {
        let query
        const options = {
            autoCommit,
        }
        if (where) {
            query = `UPDATE ${tableName} SET ${setMapping} WHERE ${where}`
        }
        else {
            query = `UPDATE ${tableName} SET ${setMapping}`
        }
        return execute({ query, data, options, isDML: true, connection, isMercury })

    }
    static async updateSQL({ where, tableName, setMapping, data = [{}], connection, autoCommit = true }) {
        let query
        if (where) {
            query = `UPDATE ${tableName} SET ${setMapping} WHERE ${where}`
        }
        else {
            query = `UPDATE ${tableName} SET ${setMapping}`
        }
        return execute({ query, bind: data, connection })

    }

    static async describe({ tableName, connection, isMercury = false }) {
        const query = `select COLUMN_NAME,DATA_LENGTH as DATA_LENGTH_BYTE,DATA_TYPE,DECODE(char_used,'C',char_length,DATA_PRECISION) DATA_LENGTH,DATA_DEFAULT,COLUMN_ID FROM ALL_TAB_COLUMNS WHERE TABLE_NAME='${tableName}'`
        return execute({ query, bind: {}, connection, isMercury })
    }

    static async describeSQL({ tableName, connection }) {
        const query = `select COLUMN_NAME,DATA_TYPE,ORDINAL_POSITION AS 'COLUMN_ID', CHARACTER_MAXIMUM_LENGTH AS 'DATA_LENGTH',NUMERIC_PRECISION AS DATA_LENGTH_BYTE from information_schema.columns WHERE table_name='${tableName}';`
        return execute({ query, bind: [], connection })
    }

    static async count({ tableName, where, connection, isMercury = false }) {
        const query = `SELECT COUNT(*) AS length from ${tableName} WHERE ${where}`
        return execute({ query, bind: [], connection, isMercury })
    }

    static async upsert({ tableName, where, setMapping, data, tableSchema, mapColumnName, columnName, connection, autoCommit = true, isMercury = false }) {
        const query = `merge into ${tableName} using dual on (${where}) when matched then update SET ${setMapping} when not matched then INSERT (${columnName}) VALUES (${mapColumnName})`
        const options = {
            autoCommit,
            bindDefs: tableSchema,
        }
        return execute({ query, data, options, isDML: true, connection, isMercury })
    }

    static async upsertSQL({ tableName, columnName, data, connection, placeholders, updateQuery }) {
        const query = `INSERT INTO ${tableName} (${columnName}) VALUES ${placeholders} ON DUPLICATE KEY UPDATE ${updateQuery}`
        return execute({ query, bind: data, connection })
    }

    static async callProcedure({ procedureName, placeholders, input, connection }) {
        const query = `CALL ${procedureName}${placeholders}`;
        return execute({ query, bind: input, connection })
    }

    static async findBypagination({ tableName, columnName, where, data, connection, limit, offset, orderBy = '' }) {
        const query = `SELECT ${columnName} FROM ${tableName} WHERE ${where} ${orderBy} LIMIT ${limit} OFFSET ${offset}`
        return execute({ query, bind: data, connection })
    }

    static async addIgnoreSQL({ tableName, columnName, data, connection, placeholders }) {
        const query = `INSERT IGNORE INTO ${tableName} (${columnName}) VALUES ${placeholders}`
        return execute({ query, bind: data, connection })
    }
    // for 2 columns only, need dynamic
    static async findDuplicate({ tableName, reqFields, columnOne, columnTwo, data, connection, placeholders, where = '' }) {   // using custom where
        const query = `SELECT ${reqFields} FROM ${tableName} WHERE (${columnOne},${columnTwo}) IN ${placeholders}${where}`
        return execute({ query, bind: data, connection })
    }
    // static async subscribe({ tableName, options, subscribe = true, connection }) {
    //     return execute({ tableName, options, subscribe, connection })
    // }
}

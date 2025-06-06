/**
 * Returns uploadData, placeholders and columnNames for Sql function
 * @param reqData Array of objects to perfrom database operation on
 * 
 */
export class SqlBuilder {

    constructor(reqData) {
        // data must be array of objects
        if (!Array.isArray(reqData) || reqData?.length === 0) {
            throw new Error(`'reqData' must be an array of obects.`)
        }
        this.reqData = reqData;
    }

    /**
     * @returns {uploadData} array containing values form reqData
     */
    getUploadData() {
        this.uploadData = this.reqData?.flatMap((obj) => Object.values(obj))
        return this;
    }

    /**
     * @returns {placeholders} string '(?,?,...), (?,?,...), ...'
     */
    getPlaceholders() {
        this.placeholders = this.reqData?.flatMap((el) => `(${Object.values(el)
            .map((value) => '?')
            .join(',')})`
        ).join(',');
        return this;
    }

    /**
     * @returns {columnNames} array names of columns, from first element of Array
     */
    getColumnNames() {
        this.columnNames = Object.keys(this.reqData[0])
        return this;
    }

    /**
     * 
     * @param {array} cols array of column names, for which updateQuery is formed
     * @returns {string} updateQuery
     */
    getUpdateQuery(cols) {
        this.updateQuery = cols
            .map((col) => `${col}=VALUES(${col})`)
            .join(', ');
        return this
    }
}
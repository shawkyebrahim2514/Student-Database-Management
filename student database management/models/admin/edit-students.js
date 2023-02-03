const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

async function editStudents(req) {
    let data = parseBody(req)
    let columnType = await isValidTableAndColumn(data.tableName, data.columnName);
    if (columnType) {
        await executeQuery(req, data, columnType)
    } else {
        req.session.warningMessage = makeWarningMessage()
        return 0;
    }
}

function parseBody(req) {
    return {
        startID: req.body.startID,
        endID: req.body.endID,
        tableName: req.body.tableName,
        columnName: req.body.columnName,
        updateValue: req.body.updateValue
    }
}

async function isValidTableAndColumn(tableName, columnName) {
    const sql = `SELECT data_type
                 FROM information_schema.columns
                 WHERE table_schema = 'student_db'
                   AND table_name = '${tableName}'
                   AND column_name = '${columnName}'`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (!results.length) {
                resolve('');
            } else {
                resolve(results[0].DATA_TYPE)
            }
        });
    });
}

function executeQuery(req, data, columnType) {
    let sql = makeQuery(data, columnType)
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            req.session.successfulMessage = makeSuccessfulMessage(data.startID, data.endID)
            resolve(1);
        });
    });
}

function makeQuery(data, columnType) {
    let sql = `update ${data.tableName}
               set ${data.columnName} = `;

    if (columnType === 'int') {
        sql += `${data.updateValue} `
    } else {
        sql += `'${data.updateValue}' `
    }

    if (data.tableName === 'students') {
        sql += `where id between ${data.startID} and ${data.endID}`
    } else {
        sql += `where studentID between ${data.startID} and ${data.endID}`
    }
    return sql
}

function makeSuccessfulMessage(startID, endID) {
    return `Successfully updating students with IDs from ${startID} to ${endID}`
}

function makeWarningMessage() {
    return 'The fields is invalid!'
}

module.exports = {editStudents}
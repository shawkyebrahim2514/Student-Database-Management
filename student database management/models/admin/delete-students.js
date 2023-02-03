const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

async function deleteStudents(req) {
    let data = parseBody(req)
    let isValidRange = handlingErrors.validateRangeOfIDs(data.startID, data.endID);
    if (isValidRange) {
        await executeQuery(req, data)
    } else {
        req.session.warningMessage = makeWarningMessage()
        return 0;
    }
}

function parseBody(req) {
    return {
        startID: req.body.startID,
        endID: req.body.endID
    }
}

async function executeQuery(req, data) {
    const sql = makeQuery(data.startID, data.endID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            req.session.successfulMessage = makeSuccessfulMessage(data.startID, data.endID)
            resolve(1);
        });
    });
}

function makeQuery(startID, endID) {
    return `delete
            from students
            where id between ${startID} and ${endID}`
}

function makeSuccessfulMessage(startID, endID) {
    return `Successfully deleting students whose IDs from ${startID} to ${endID}`
}

function makeWarningMessage() {
    return 'The range is invalid!'
}

module.exports = {deleteStudents}
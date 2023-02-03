const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

async function addStudents(req) {
    let data = parseBody(req)
    let isValidRange = handlingErrors.validateRangeOfIDs(data.startID, data.endID);
    if (isValidRange) {
        let isNewIDs = await checkNewIDs(data.startID, data.endID);
        if (!isNewIDs) {
            req.session.warningMessage = "There are students exist in this range of IDs"
            return 0
        } else {
            await executeQuery(req, data)
        }
    } else {
        req.session.warningMessage = 'The range is invalid!'
        return 0;
    }
}

function parseBody(req) {
    return {
        startID: req.body.startID,
        endID: req.body.endID
    }
}

async function checkNewIDs(startID, endID) {
    const sql = `select id
                 from students
                 where id between ${startID} and ${endID}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (!results.length) {
                resolve(1);
            } else {
                resolve(0)
            }
        });
    });
}

async function executeQuery(req, data) {
    const studentIDs = [];
    for (let i = data.startID; i <= data.endID; i++) {
        studentIDs.push([i]);
    }
    const sql = makeQuery();
    return new Promise((resolve, reject) => {
        connection.query(sql, [studentIDs], (error, results) => {
            if (error) throw error;
            req.session.successfulMessage = makeSuccessfulMessage(data.startID, data.endID)
            resolve(1);
        });
    });
}

function makeQuery(startID, endID) {
    return `INSERT INTO unregisteredStudents (id)
            VALUES ?`
}

function makeSuccessfulMessage(startID, endID) {
    return `Successfully inserting students with IDs from ${startID} to ${endID}`
}

module.exports = {addStudents}
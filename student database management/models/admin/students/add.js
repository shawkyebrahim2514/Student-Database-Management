const mysql = require("mysql2");
const handlingErrors = require("../../../public/javascript/admin/handling-errors");
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
        let isIDsUsed = await checkUsedIDs(req, data.startID, data.endID);
        if (isIDsUsed) {
            return 0;
        } else {
            await executeQuery(req, data)
            return 1;
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

async function checkUsedIDs(req, startID, endID) {
    let warningMessage = ''
    let isStudentsInIDs = await checkIDsExistInStudents(startID, endID)
    if(isStudentsInIDs){
        warningMessage += "There are students exist in this range of IDs\n"
    }
    let isUnregisteredStudentsInIDs = await checkIDsExistInUnregisteredStudents(startID, endID)
    if(isUnregisteredStudentsInIDs) {
        warningMessage += "There are unregistered students exist in this range of IDs\n"
    }
    req.session.warningMessage = warningMessage
    return isStudentsInIDs || isUnregisteredStudentsInIDs
}

async function checkIDsExistInStudents(startID, endID) {
    const sql = `select id
                 from students
                 where id between ${startID} and ${endID}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (!results.length) {
                resolve(0);
            } else {
                resolve(1)
            }
        });
    });
}

async function checkIDsExistInUnregisteredStudents(startID, endID) {
    const sql = `select id
                 from unregisteredStudents
                 where id between ${startID} and ${endID}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            if (!results.length) {
                resolve(0);
            } else {
                resolve(1)
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
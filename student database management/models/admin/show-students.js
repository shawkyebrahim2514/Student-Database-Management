const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

async function showStudents(req) {
    let option = req.body.searchOption
    if (option === 'studentID') {
        await showByID(req);
    } else if (option === 'level') {
        await showByLevel(req)
    } else {
        await showByGPA(req)
    }
}

async function showByID(req) {
    let startID = req.body.studentIDFrom
    let endID = req.body.studentIDTo
    let isValidIDs = handlingErrors.validateRangeOfIDs(startID, endID);
    if (isValidIDs) {
        const whereStatement = `where students.id between ${startID} and ${endID}`
        const sql = makeQuery(whereStatement)
        await showStudentCards(req, sql)
    } else {
        req.session.warningMessage = 'The range of IDs is invalid!'
        return 0;
    }
}

async function showByGPA(req) {
    let startGPA = req.body.gpaFrom
    let endGPA = req.body.gpaTo
    let isValidGPAs = handlingErrors.validateRangeOfGPAs(startGPA, endGPA);
    if (isValidGPAs) {
        const whereStatement = `where academicData.gpa between ${startGPA} and ${endGPA}`
        const sql = makeQuery(whereStatement)
        await showStudentCards(req, sql)
    } else {
        req.session.warningMessage = 'The range of GPAs is invalid!'
        return 0;
    }
}

async function showByLevel(req) {
    let level = req.body.level
    let isValidLevel = handlingErrors.validateShowByLevel(level);
    if (isValidLevel) {
        const whereStatement = `where academicData.level = ${level}`
        const sql = makeQuery(whereStatement)
        await showStudentCards(req, sql)
    } else {
        req.session.warningMessage = 'The level is invalid!'
        return 0;
    }
}

function makeQuery(whereStatement) {
    let sql = `select students.id            as studentID,
                      personalData.firstName as firstName,
                      personalData.lastName  as lastName,
                      academicData.level     as level,
                      academicData.GPA       as gpa
               from students
                        join personalData on students.id = personalData.studentID
                        join contactData on students.id = contactData.studentID
                        join academicData on students.id = academicData.studentID `;
    sql += whereStatement
    return sql

}

async function showStudentCards(req, sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) throw error;
            let students = []
            for (i = 0; i < results.length; i++) {
                students.push({
                    id: results[i].studentID,
                    firstName: results[i].firstName,
                    lastName: results[i].lastName,
                    level: results[i].level,
                    gpa: results[i].gpa
                })
            }
            req.session.students = students
            resolve(1);
        });
    });
}

module.exports = {showStudents}
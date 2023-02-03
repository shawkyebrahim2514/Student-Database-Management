const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../public/javascript/student/utility-functions");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showPage = async (req, res) => {
    let studentCourseID = req.params.studentCourseID
    let isStudentHaveCourse = await handlingErrors.checkStudentHaveCourse(req.session.user.id, studentCourseID)
    if (isStudentHaveCourse) {
        req.session.courseInfo = await utilityFunctions.executeQueryForCourseInfo(req.params.studentCourseID)
        return 1;
    } else {
        return 0;
    }
}

const addNewNote = async (req, res) => {
    let warningMessage = handlingErrors.validateNoteInfo(req.body.title, req.body.content)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        await executeQuery(req)
        return 1;
    }
}

async function executeQuery(req) {
    let sql = makeQuery(req)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

function makeQuery(req) {
    return `insert into notes (studentCourseID, title, content)
            values (${req.params.studentCourseID}, '${req.body.title}', "${req.body.content}")`
}

module.exports = {showPage, addNewNote}
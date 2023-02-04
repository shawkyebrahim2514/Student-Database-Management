const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

function parseMessages(req) {
    let warningMessage = req.session.warningMessage
    req.session.warningMessage = ''
    let successfulMessage = req.session.successfulMessage
    return {warningMessage, successfulMessage}
}

async function executeQueryForCourseInfo(studentCourseID) {
    let sql = makeQueryForCourseInfo(studentCourseID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            let data = results[0]
            resolve(data)
        });
    });
}

function makeQueryForCourseInfo(studentCourseID) {
    return `select courses.name as courseName, courses.code as courseCode
            from studentCourse
                     join courses on studentCourse.courseID = courses.id
            where studentCourse.id = ${studentCourseID}`
}

async function executeSingleQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

module.exports = {parseMessages, executeQueryForCourseInfo, executeSingleQuery}
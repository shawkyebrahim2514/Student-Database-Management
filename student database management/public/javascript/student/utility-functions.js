const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

let data = {}
if(Object.keys(data).length === 0){
    console.log("yes")
}

function parseMessages(req) {
    let warningMessage = req.session.warningMessage
    req.session.warningMessage = ''
    return {warningMessage}
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

module.exports = {parseMessages, executeQueryForCourseInfo}
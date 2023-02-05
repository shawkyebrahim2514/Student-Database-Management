const mysql = require("mysql2");
const handlingErrors = require("../../../public/javascript/student/handling-errors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const saveNewCourse = async (req) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateCourseInfo(data)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        let isCourseBelongsToStudentBefore = await checkCourseBelongsToStudent(req.session.user.id, data.courseID)
        if (isCourseBelongsToStudentBefore) {
            req.session.warningMessage = 'This course already exists!'
            return 0;
        } else {
            return await executeQuery(req, data)
        }
    }
}

function parseBody(req) {
    return {
        courseID: req.body.courseSelected,
        courseGrade: req.body.grade,
        courseLevel: req.body.level,
        courseSemester: req.body.semester
    }
}

async function checkCourseBelongsToStudent(studentId, courseID) {
    let sql = `select studentID
               from studentCourse
               where studentID = ${studentId}
                 and courseID = ${courseID}`
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length) {
                resolve(1);
            } else {
                resolve(0);
            }
        });
    });
}

async function executeQuery(req, data) {
    let sql = makeQuery(req.session.user.id, data)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1);
        });
    });
}

function makeQuery(studentID, data) {
    return `INSERT INTO studentCourse (studentID, courseID, grade, level, semester)
            values (${studentID}, ${data.courseID}, ${data.courseGrade},
                    ${data.courseLevel}, ${data.courseSemester})`;
}

module.exports = {saveNewCourse}
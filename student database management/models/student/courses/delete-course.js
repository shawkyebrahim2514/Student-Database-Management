const mysql = require("mysql2");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const deleteCourse = async (req, res) => {
    let isStudentHaveCourse = await utilityFunctions.checkStudentHaveCourse(req.session.user.id, req.params.studentCourseID)
    if (isStudentHaveCourse) {
        return await executeQuery(req.params.studentCourseID)
    } else {
        return 0;
    }
}

async function executeQuery(studentCourseID) {
    let sql = makeQuery(studentCourseID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

function makeQuery(studentCourseID) {
    return `delete
            from studentCourse
            where id = ${studentCourseID}`
}

module.exports = {deleteCourse}

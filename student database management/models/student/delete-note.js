const mysql = require("mysql2");
const handleErrors = require("../../public/javascript/student/handling-errors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const deleteNote = async (req, res) => {
    let studentCourseID = req.params.studentCourseID
    let isStudentHaveCourse = await handleErrors.checkStudentHaveCourse(req.session.user.id, studentCourseID)
    if (isStudentHaveCourse) {
        await executeQuery(req.params.noteID)
        return 1;
    } else {
        return 0;
    }
}

async function executeQuery(noteID) {
    let sql = makeQuery(noteID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

function makeQuery(noteID) {
    return `delete
            from notes
            where id = ${noteID}`
}

module.exports = {deleteNote}
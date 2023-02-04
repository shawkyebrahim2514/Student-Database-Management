const mysql = require("mysql2");
const handlingErrors = require("../../../public/javascript/student/handling-errors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showPage = async (req) => {
    let studentCourseID = req.params.studentCourseID
    let isStudentHaveCourse = await handlingErrors.checkStudentHaveCourse(req.session.user.id, studentCourseID)
    if (isStudentHaveCourse) {
        req.session.noteInfo = await getNoteInfo(req.params.noteID)
        return 1;
    } else {
        return 0;
    }
}

async function getNoteInfo(noteID) {
    let sql = makeQueryForGetNoteInfo(noteID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            resolve(results[0])
        });
    })
}

function makeQueryForGetNoteInfo(noteID) {
    return `select title, content
            from notes
            where notes.id = ${noteID};`
}

const updateNote = async (req) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateNoteInfo(data)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        await executeQueryForUpdateNote(req)
        return 1;
    }
}

function parseBody(req) {
    return {
        title: req.body.title,
        content: req.body.content
    }
}

function executeQueryForUpdateNote(req) {
    let sql = makeQueryForUpdateNote(req)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

function makeQueryForUpdateNote(req) {
    return `update notes
            set title   = '${req.body.title}',
                content = "${req.body.content}"
            where id = ${req.params.noteID};`
}

module.exports = {showPage, updateNote}
const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../public/javascript/student/utility-functions");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showPage = async (req, whereStatement) => {
    let studentCourseID = req.params.studentCourseID
    let isStudentHaveCourse = await handlingErrors.checkStudentHaveCourse(req.session.user.id, studentCourseID)
    if (isStudentHaveCourse) {
        let data = await utilityFunctions.executeQueryForCourseInfo(studentCourseID)
        let notes = await executeQueryForCollectNotes(studentCourseID, whereStatement)
        req.session.courseNotes = {
            studentCourseID,
            courseName: data.courseName,
            courseCode: data.courseCode,
            notes,
            searchBarValue: req.body.searchWord
        }
        return 1;
    } else {
        return 0;
    }
}

async function executeQueryForCollectNotes(studentCourseID, whereStatement) {
    let sql = makeQueryForCollectNotes(studentCourseID, whereStatement)
    console.log('SQL', sql)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            let notes = parseResults(results)
            resolve(notes)
        });
    });
}

const makeQueryForCollectNotes = (studentCourseID, whereStatement) => {
    let sql = `select notes.id          as noteID,
                      if(char_length(notes.title) > 45, concat(substr(notes.title, 1, 45), '...'),
                         notes.title)   as noteTitle,
                      if(char_length(notes.content) > 100,
                         concat(substr(notes.content, 1, 100), '...'),
                         notes.content) as noteContent
               from notes
                        join studentCourse on notes.studentCourseID = studentCourse.id
               where studentCourse.id = ${studentCourseID} `
    sql += whereStatement
    return sql
}

function parseResults(results) {
    let notes = []
    for (i = 0; i < results.length; i++) {
        if (results[i].title === null) continue
        notes.push({
            id: results[i].noteID,
            title: results[i].noteTitle,
            content: results[i].noteContent
        })
    }
    return notes
}

const searchNote = async (req, res) => {
    let searchWord = req.body.searchWord
    let whereStatement = `and (notes.title like '%${searchWord}%'
                or notes.content like '%${searchWord}%')`
    return await showPage(req, whereStatement)
}

module.exports = {showPage, searchNote}
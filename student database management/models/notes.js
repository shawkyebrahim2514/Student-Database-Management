const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const getNotes = (req, res) => {
    let sql = `select notes.id          as noteID,
                      if(char_length(notes.title) > 45, concat(substr(notes.title, 1, 45), '...'),
                         notes.title)   as noteTitle,
                      if(char_length(notes.content) > 100,
                         concat(substr(notes.content, 1, 100), '...'),
                         notes.content) as noteContent
               from notes
                        join studentCourse on notes.studentCourseID = studentCourse.id
               where studentCourse.id = ${req.params.id}`
    showNotes(req, res, sql, '')
}

const showNotes = (req, res, sql, searchBarValue) => {
    // check if the student owner this course or not
    let checkSQL = `select studentCourse.studentID as studentID,
                           courses.name            as courseName,
                           courses.code            as courseCode
                    from studentCourse
                             join courses on studentCourse.courseID = courses.id
                    where studentCourse.id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let courseName = results[0].courseName, courseCode = results[0].courseCode,
                studentCourseID = req.params.id, notes = []
            connection.query(sql, (err, results) => {
                if (err) throw err;
                for (i = 0; i < results.length; i++) {
                    if (results[i].title === null) continue
                    notes.push({id: results[i].noteID, title: results[i].noteTitle, content: results[i].noteContent})
                }
                res.render('courseNotes', {studentCourseID, courseName, courseCode, notes, searchBarValue})
            });
        }
    });
}

const showAddingPage = (req, res) => {
    // check if the student owner this course or not
    let checkSQL = `select studentCourse.studentID as studentID
                    from studentCourse
                    where studentCourse.id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/courses/${req.params.id}/notes')
            return;
        } else {
            let studentCourseID = req.params.id, studentID = req.session.updatedData.studentID;
            res.render('addNote', {studentCourseID, studentID})
        }
    });
}

const addNewNote = (req, res) => {
    let sql = `insert into notes (studentCourseID, title, content)
               values (${req.params.id}, '${req.body.title}', "${req.body.content}")`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(`/courses/${req.params.id}/notes`)
    });
}

const showEditingPage = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentCourse.studentID as studentID,
                           notes.title             as noteTitle,
                           notes.content           as noteContent
                    from notes
                             join studentCourse on notes.studentCourseID = studentCourse.id
                    where notes.id = ${req.params.noteID};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let studentCourseID = req.params.courseID, noteID = req.params.noteID;
            if (err) throw err;
            res.render('editNote', {
                studentCourseID, noteID, title: results[0].noteTitle,
                content: results[0].noteContent
            })
        }
    });
}

const updateNote = (req, res) => {
    let sql = `update notes
               set title   = '${req.body.title}',
                   content = "${req.body.content}"
               where id = ${req.params.noteID};`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(`/courses/${req.params.courseID}/notes`)
    });
}
const deleteNote = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentCourse.studentID as studentID
                    from notes
                    join studentCourse on notes.studentCourseID = studentCourse.id
                    where notes.id = ${req.params.noteID};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let sql = `delete
                       from notes
                       where id = ${req.params.noteID}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.redirect(`/courses/${req.params.courseID}/notes`)
            });
        }
    });
}

const searchWord = (req, res) => {
    let sql = `select notes.id          as noteID,
                      if(char_length(notes.title) > 45, concat(substr(notes.title, 1, 45), '...'),
                         notes.title)   as noteTitle,
                      if(char_length(notes.content) > 100,
                         concat(substr(notes.content, 1, 100), '...'),
                         notes.content) as noteContent
               from notes
                        join studentCourse on notes.studentCourseID = studentCourse.id
               where studentCourse.id = ${req.params.id}
                 and (notes.title like '%${req.body.searchWord}%'
                   or notes.content like '%${req.body.searchWord}%');`
    showNotes(req, res, sql, req.body.searchWord)
}

module.exports = {
    getNotes, showAddingPage, addNewNote, showEditingPage, updateNote, deleteNote,
    searchWord
}
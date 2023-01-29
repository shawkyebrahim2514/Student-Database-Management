const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showNotes = (req, res) => {
    console.log(req.params)
    console.log('from func', req.params.id)
    let courseName, courseID = req.params.id, notes = []
    // check if the student owner this course or not
    let checkSQL = `select studentID, name
                    from courses
                    where id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            courseName = results[0].name
            let sql = `select coursesNotes.id as id, coursesNotes.title as title, coursesNotes.content as content
                       from courses
                                join coursesNotes on courses.id = coursesNotes.courseID
                       where courses.id = ${req.params.id};`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                for (i = 0; i < results.length; i++) {
                    if (results[i].title === null) continue
                    notes.push({id: results[i].id, title: results[i].title, content: results[i].content})
                }
                res.render('courseNotes', {courseID, courseName, notes})
            });
        }
    });
}

const showAddingPage = (req, res) => {
    // check if the student owner this course or not
    let checkSQL = `select studentID, name
                    from courses
                    where id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let courseID = req.params.id, studentID = req.session.updatedData.studentID;
            res.render('addNote', {courseID, studentID})
        }
    });
}

const addNewNote = (req, res) => {
    let sql = `insert into coursesNotes (courseID, title, content)
               values (${req.params.id}, '${req.body.title}', "${req.body.content}")`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect(`/courses/${req.params.id}/notes`)
    });
}

const showEditingPage = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select courses.studentID as studentID
                    from coursesNotes
                             join courses on coursesNotes.courseID = courses.id
                    where coursesNotes.id = ${req.params.noteID};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let courseID = req.params.courseID, noteID = req.params.noteID;
            let sql = `select title, content
                       from coursesNotes
                       where id = ${noteID}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.render('editNote', {
                    courseID, noteID, title: results[0].title,
                    content: results[0].content
                })
            });
        }
    });
}

const updateNote = (req, res) => {
    let sql = `update coursesNotes
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
    let checkSQL = `select courses.studentID as studentID
                    from coursesNotes
                             join courses on coursesNotes.courseID = courses.id
                    where coursesNotes.id = ${req.params.noteID};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let sql = `delete
                       from coursesNotes
                       where id = ${req.params.noteID}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.redirect(`/courses/${req.params.courseID}/notes`)
            });
        }
    });
}

module.exports = {showNotes, showAddingPage, addNewNote, showEditingPage, updateNote, deleteNote}
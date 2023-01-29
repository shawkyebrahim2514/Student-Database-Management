const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showCoursesCards = (req, res) => {
    // show student main data in the page
    let sql = `select courses.id       as courseID,
                      courses.name     as courseName,
                      courses.grade    as courseGrade,
                      courses.level    as courseLevel,
                      courses.semester as courseSemester
               from students
                        left join courses on students.id = courses.studentID
               where students.id = ${req.session.updatedData.studentID}
               order by courseLevel, courseSemester;`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        let courses = []
        for (i = 0; i < results.length; i++) {
            if (results[i].courseName === null) continue
            courses.push({
                id: results[i].courseID, name: results[i].courseName, grade: results[i].courseGrade,
                level: results[i].courseLevel, semester: results[i].courseSemester
            })
        }
        res.render('courses', {courses})
    });
}

const saveNewCourse = (req, res) => {
    let courseName = req.body.name
    let courseGrade = req.body.grade
    let courseLevel = req.body.level
    let courseSemester = req.body.semester
    let sql = `INSERT INTO courses (studentID, name, grade, level, semester)
               values (${req.session.updatedData.studentID}, '${courseName}', ${courseGrade},
                       ${courseLevel}, ${courseSemester})`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/courses')
    });
}

const showCourseInfo = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentID
                    from courses
                    where id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/profile')
            return;
        } else {
            let sql = `select name, grade, level, semester
                       from courses
                       where id = ${req.params.id}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.render('editCourse', {
                    id: req.params.id, name: results[0].name,
                    grade: results[0].grade, level: results[0].level, semester: results[0].semester
                })
            });
        }
    });
}

const updateCourse = (req, res) => {
    let sql = `update courses
               set name     = '${req.body.name}',
                   grade    = ${req.body.grade},
                   level    = ${req.body.level},
                   semester = ${req.body.semester}
               where id = ${req.params.id};`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/courses')
    });
}

const deleteCourse = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentID
                    from courses
                    where id = ${req.params.id};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/courses')
            return;
        } else {
            let sql = `delete
                       from courses
                       where id = ${req.params.id}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.redirect(`/courses`)
            });
        }
    });
}

module.exports = {showCoursesCards, saveNewCourse, showCourseInfo, updateCourse, deleteCourse}
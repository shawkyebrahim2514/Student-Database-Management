const mysql = require("mysql2");
const handlingErrors = require("../public/javascript/handlingErrors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showCoursesCards = (req, res) => {
    // show student main data in the page
    let sql = `select studentCourse.id       as courseID,
                      courses.name           as courseName,
                      courses.code           as courseCode,
                      studentCourse.grade    as courseGrade,
                      studentCourse.level    as courseLevel,
                      studentCourse.semester as courseSemester
               from students
                        join studentCourse on students.id = studentCourse.studentID
                        join courses on studentCourse.courseID = courses.id
               where students.id = ${req.session.updatedData.studentID}
               order by courseLevel, courseSemester`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        let courses = []
        for (i = 0; i < results.length; i++) {
            if (results[i].courseName === null) continue
            courses.push({
                id: results[i].courseID,
                name: results[i].courseName,
                code: results[i].courseCode,
                grade: results[i].courseGrade,
                level: results[i].courseLevel,
                semester: results[i].courseSemester
            })
        }
        res.render('courses', {courses})
    });
}

const getAddingPage = (req, res) => {
    let sql = `select id, name, code
               from courses`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        let courses = []
        for (i = 0; i < results.length; i++) {
            if (results[i].name === null) continue
            courses.push({
                id: results[i].id, name: results[i].name, code: results[i].code
            })
        }
        let warningMessage = req.session.warningMessage;
        req.session.warningMessage = '';
        res.render('addCourse', {courses, warningMessage})
    });
}

const saveNewCourse = (req, res) => {
    let courseID = req.body.courseSelected
    let courseGrade = req.body.grade
    let courseLevel = req.body.level
    let courseSemester = req.body.semester

    let warningMessage = handlingErrors.validateCourseInfo(courseID, courseGrade, courseLevel, courseSemester)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return res.redirect("/courses/add")
    } else {
        let sql = `INSERT INTO studentCourse (studentID, courseID, grade, level, semester)
                   values (${req.session.updatedData.studentID}, ${courseID}, ${courseGrade},
                           ${courseLevel}, ${courseSemester})`;
        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.redirect('/courses')
        });
    }
}

const showCourseInfo = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentID
                    from studentCourse
                    where id = ${req.params.id} limit 1`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        console.log(results)
        if (results.length == 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/courses')
            return;
        } else {
            let coursesOptionsSQL = `select id, name, code
                                     from courses`
            connection.query(coursesOptionsSQL, (err, results) => {
                if (err) throw err;
                let coursesOptions = []
                for (i = 0; i < results.length; i++) {
                    if (results[i].name === null) continue
                    coursesOptions.push({
                        id: results[i].id, name: results[i].name, code: results[i].code
                    })
                }
                let sql = `select courses.id             as courseID,
                                  courses.code           as courseCode,
                                  courses.name           as courseName,
                                  studentCourse.grade    as courseGrade,
                                  studentCourse.level    as courseLevel,
                                  studentCourse.semester as courseSemester
                           from studentCourse
                                    join courses on studentCourse.courseID = courses.id
                           where studentCourse.id = ${req.params.id}`
                connection.query(sql, (err, results) => {
                    if (err) throw err;
                    let warningMessage = req.session.warningMessage;
                    req.session.warningMessage = '';
                    res.render('editCourse', {
                        studentCourseID: req.params.id,
                        courseID: results[0].courseID,
                        courseCode: results[0].courseCode,
                        courseName: results[0].courseName,
                        courseGrade: results[0].courseGrade,
                        courseLevel: results[0].courseLevel,
                        courseSemester: results[0].courseSemester,
                        coursesOptions,
                        warningMessage
                    })
                });
            });
        }
    });
}

const updateCourse = (req, res) => {
    let courseID = req.body.courseSelected
    let courseGrade = req.body.courseGrade
    let courseLevel = req.body.courseLevel
    let courseSemester = req.body.courseSemester
    let warningMessage = handlingErrors.validateCourseInfo(courseID, courseGrade, courseLevel, courseSemester)
    console.log("course selected", courseID)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return res.redirect(`/courses/${req.params.id}/edit`)
    } else {
        let sql = `update studentCourse
                   set courseID = '${courseID}',
                       grade    = ${courseGrade},
                       level    = ${courseLevel},
                       semester = ${courseSemester}
                   where id = ${req.params.id};`

        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.redirect('/courses')
        });
    }
}

const deleteCourse = (req, res) => {
    // check if the student owner this course
    let checkSQL = `select studentID
                    from studentCourse
                    where id = ${req.params.id};`
    connection.query(checkSQL, (err, results) => {
        if (err) throw err;
        if (results.length === 0 || results[0].studentID != req.session.updatedData.studentID) {
            res.redirect('/courses')
            return;
        } else {
            let sql = `delete
                       from studentCourse
                       where id = ${req.params.id}`
            connection.query(sql, (err, results) => {
                if (err) throw err;
                res.redirect(`/courses`)
            });
        }
    });
}

module.exports = {showCoursesCards, saveNewCourse, showCourseInfo, updateCourse, deleteCourse, getAddingPage}
const mysql = require("mysql2");
const handlingErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const get = async (req, res) => {
    let isStudentHaveCourse = await handlingErrors.checkStudentHaveCourse(req.session.user.id,
        req.params.studentCourseID)
    if (isStudentHaveCourse) {
        await executeQueryForGet(req)
        return 1;
    } else {
        return 0;
    }
}

function executeQueryForGet(req) {
    let sql = makeQueryForGet(req.params.studentCourseID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            req.session.courseInfoPage = setCourseInfoSession(req, results)
            resolve(1)
        });
    });
}

function makeQueryForGet(studentCourseID) {
    return `select courses.id             as courseID,
                   courses.code           as courseCode,
                   courses.name           as courseName,
                   studentCourse.grade    as courseGrade,
                   studentCourse.level    as courseLevel,
                   studentCourse.semester as courseSemester
            from studentCourse
                     join courses on studentCourse.courseID = courses.id
            where studentCourse.id = ${studentCourseID}`
}

function setCourseInfoSession(req, results) {
    return {
        studentID: req.session.user.id,
        studentCourseID: req.params.studentCourseID,
        courseID: results[0].courseID,
        courseCode: results[0].courseCode,
        courseName: results[0].courseName,
        courseGrade: results[0].courseGrade,
        courseLevel: results[0].courseLevel,
        courseSemester: results[0].courseSemester,
        allCoursesOptions: req.session.allCoursesOptions
    }
}

const post = async (req, res) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateCourseInfo(data.courseID, data.courseGrade, data.courseLevel,
        data.courseSemester)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        return await executeQueryForPost(req.params.studentCourseID, data)
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

async function executeQueryForPost(studentCourseID, data) {
    let sql = makeQueryForPost(studentCourseID, data)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

function makeQueryForPost(studentCourseID, data) {
    return `update studentCourse
            set courseID = '${data.courseID}',
                grade    = ${data.courseGrade},
                level    = ${data.courseLevel},
                semester = ${data.courseSemester}
            where id = ${studentCourseID};`
}

module.exports = {get, post}
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showCoursesPage = async (req) => {
    // get all courses options to be using in addCourse or editCourse
    req.session.allCoursesOptions = await getAllCoursesOptions()
    let sql = makeQuery(req)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            req.session.studentCourses = parseResults(results)
            resolve(1)
        });
    });
}

async function getAllCoursesOptions() {
    let sql = `select id, name, code
               from courses`
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            let courses = []
            for (i = 0; i < results.length; i++) {
                if (results[i].name === null) continue
                courses.push({
                    id: results[i].id, name: results[i].name, code: results[i].code
                })
            }
            resolve(courses)
        });
    });
}

function makeQuery(req) {
    return `select studentCourse.id       as courseID,
                   courses.name           as courseName,
                   courses.code           as courseCode,
                   studentCourse.grade    as courseGrade,
                   studentCourse.level    as courseLevel,
                   studentCourse.semester as courseSemester
            from students
                     join studentCourse on students.id = studentCourse.studentID
                     join courses on studentCourse.courseID = courses.id
            where students.id = ${req.session.user.id}
            order by courseLevel, courseSemester`
}

function parseResults(results) {
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
    return courses
}

module.exports = {showCoursesPage}
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showStudentInfo = async (req) => {
    let sql = makeQuery(req.session.user.id)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            req.session.user.info = results[0]
            resolve(1)
        });
    });
}

function makeQuery(studentID) {
    return `select students.id             as studentID,
                   students.password       as password,
                   personalData.firstName  as firstName,
                   personalData.lastName   as lastName,
                   personalData.birthday   as birthday,
                   personalData.gender     as gender,
                   contactData.email       as email,
                   contactData.phoneNumber as phoneNumber,
                   contactData.address     as address,
                   academicData.level      as level,
                   academicData.GPA        as gpa
            from students
                     join personalData on students.id = personalData.studentID
                     join contactData on students.id = contactData.studentID
                     join academicData on students.id = academicData.studentID
            where students.id = ${studentID};`
}

module.exports = {showStudentInfo}
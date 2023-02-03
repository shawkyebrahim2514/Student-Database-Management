const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/student/handling-errors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const showStudentInfo = async (req, res) => {
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

const saveStudentInfo = async (req, res) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateEditingProfile(req.session.user.id, data.password, data.firstName,
        data.laseName, data.email, data.phoneNumber, data.address, data.level, data.gpa)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        await executeSavingQueries(data)
        return 1;
    }
}

function parseBody(req) {
    return {
        studentID: req.session.user.id,
        password: req.body.password,
        firstName: req.body.firstName,
        laseName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        level: req.body.level,
        gpa: req.body.gpa
    }
}

async function executeSavingQueries(data) {
    let studentSQL = `update students
                      set password = '${data.password}'
                      where id = ${data.studentID}`;
    await executeSingleQuery(studentSQL)
    let personalSQL = `update personalData
                       set firstName = '${data.firstName}',
                           lastName  = '${data.laseName}'
                       where studentID = ${data.studentID}`;
    await executeSingleQuery(personalSQL)
    let contactSQL = `update contactData
                      set email       = '${data.email}',
                          phoneNumber = '${data.phoneNumber}',
                          address     = '${data.address}'
                      where studentID = ${data.studentID}`;
    await executeSingleQuery(contactSQL)
    let academicSQL = `update academicData
                       set level = '${data.level}',
                           gpa   = '${data.gpa}'
                       where studentID = ${data.studentID}`;
    await executeSingleQuery(academicSQL)
}

const deleteStudent = (req, res) => {
    let sql = `delete
               from students
               where id = ${req.session.user.id}`
    executeSingleQuery(sql)
}

async function executeSingleQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            resolve(1)
        });
    });
}

module.exports = {showStudentInfo, saveStudentInfo, deleteStudent}
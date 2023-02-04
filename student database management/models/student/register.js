const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/student/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const registerStudent = async (req) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateRegister(data)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        let isNewRegistration = await checkNewRegistration(data.studentID);
        if (!isNewRegistration) {
            req.session.warningMessage = 'This student account doesn\'t make valid or already exists!\n'
            return 0;
        } else {
            insertDataIntoDatabase(data)
            req.session.successfulMessage = 'Successfully registration, you can login now!\n'
            return 1;
        }
    }
}

function parseBody(req) {
    return {
        studentID: req.body.id,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        level: req.body.level,
        gpa: req.body.gpa
    }
}

function executeQuery(sql) {
    connection.query(sql, (err, results) => {
        if (err) throw err;
    });
}

async function checkNewRegistration(studentID) {
    let sql = `select *
               from unregisteredStudents
               where id = ${studentID}`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) reject(err);
            if (!results.length) {
                resolve(0);
            } else {
                resolve(1);
            }
        });
    });
}

function insertDataIntoDatabase(data) {
    let studentSQL = `INSERT INTO students (id, password)
                      values (${data.studentID}, '${data.password}')`;
    executeQuery(studentSQL)
    let personalSQL = `INSERT INTO personalData (studentID, firstName, lastName, birthday, gender)
                       values (${data.studentID}, '${data.firstName}', '${data.lastName}', '${data.birthday}',
                               '${data.gender}')`;
    executeQuery(personalSQL)
    let contactSQL = `INSERT INTO contactData (studentID, email, phoneNumber, address)
                      values (${data.studentID}, '${data.email}', '${data.phoneNumber}', '${data.address}')`;
    executeQuery(contactSQL)
    let academicSQL = `INSERT INTO academicData (studentID, level, GPA)
                       values (${data.studentID}, ${data.level}, ${data.gpa})`;
    executeQuery(academicSQL)
    let deleteUnregisteredStudentSQl = `delete
                                        from unregisteredStudents
                                        where id = ${data.studentID}`
    executeQuery(deleteUnregisteredStudentSQl)
}

module.exports = {registerStudent}
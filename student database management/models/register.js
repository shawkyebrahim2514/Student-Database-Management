const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

function executeQuery(sql) {
    connection.query(sql, (err, results) => {
        if (err) throw err;
    });
}

const registerStudent = (req, res) => {
    // collect student data from the fields
    let data = {
        studentID: req.body.id,
        password: req.body.password,
        firstName: req.body.firstName,
        laseName: req.body.lastName,
        birthday: req.body.birthday,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        level: req.body.level,
        gpa: req.body.gpa
    };
    // store these data in the corresponding tables
    let studentSQL = `INSERT INTO students (id, password)
                      values (${data.studentID}, '${data.password}')`;
    executeQuery(studentSQL)
    let personalSQL = `INSERT INTO personalData (studentID, firstName, lastName, birthday, gender)
                       values (${data.studentID}, '${data.firstName}', '${data.laseName}', '${data.birthday}',
                               '${data.gender}')`;
    executeQuery(personalSQL)
    let contactSQL = `INSERT INTO contactData (studentID, email, phoneNumber, address)
                      values (${data.studentID}, '${data.email}', '${data.phoneNumber}', '${data.address}')`;
    executeQuery(contactSQL)
    let academicSQL = `INSERT INTO academicData (studentID, level, GPA)
                       values (${data.studentID}, ${data.level}, ${data.gpa})`;
    executeQuery(academicSQL)
}

module.exports = {registerStudent}
const mysql = require("mysql2");
const handlingErrors = require("../public/javascript/handlingErrors");
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

const showStudentInfo = (req, res) => {
    // show student main data in the page
    let sql = `select students.id             as studentID,
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
               where students.id = ${req.session.updatedData.studentID};`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        let {
            studentID, password, firstName, lastName, birthday, gender, email, phoneNumber, address, level,
            gpa
        } = results[0]
        res.render('profile', {
            studentID, password, firstName, lastName, birthday, gender, email,
            phoneNumber, address, level, gpa
        })
    });
}

const editStudentInfo = (req, res) => {
    let sql = `select students.id             as studentID,
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
               where students.id = ${req.session.updatedData.studentID};`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        let {studentID, password, firstName, lastName, email, phoneNumber, address, level, gpa} = results[0]
        let warningMessage = req.session.warningMessage
        req.session.warningMessage = ''
        res.render('editProfile.ejs', {
            studentID, password, firstName, lastName, email,
            phoneNumber, address, level, gpa, warningMessage
        })
    });
}

const saveStudentInfo = (req, res) => {
    // collect student data from the fields
    let data = {
        studentID: req.session.updatedData.studentID,
        password: req.body.password,
        firstName: req.body.firstName,
        laseName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        level: req.body.level,
        gpa: req.body.gpa
    };

    let warningMessage = handlingErrors.validateEditingProfile(data.studentID, data.password, data.firstName, data.laseName,
        data.email, data.phoneNumber, data.address, data.level, data.gpa)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return res.redirect("/profile/edit")
    } else {
        // store these data in the corresponding tables
        let studentSQL = `update students
                          set password = '${data.password}'
                          where id = ${data.studentID}`;
        executeQuery(studentSQL)
        let personalSQL = `update personalData
                           set firstName = '${data.firstName}',
                               lastName  = '${data.laseName}'
                           where studentID = ${data.studentID}`;
        executeQuery(personalSQL)
        let contactSQL = `update contactData
                          set email       = '${data.email}',
                              phoneNumber = '${data.phoneNumber}',
                              address     = '${data.address}'
                          where studentID = ${data.studentID}`;
        executeQuery(contactSQL)
        let academicSQL = `update academicData
                           set level = '${data.level}',
                               gpa   = '${data.gpa}'
                           where studentID = ${data.studentID}`;
        executeQuery(academicSQL)
    }
}

const deleteStudent = (req, res) => {
    let sql = `delete
               from students
               where id = ${req.session.updatedData.studentID}`
    connection.query(sql, (err, results) => {
        if (err) throw err;
    });
}

module.exports = {showStudentInfo, editStudentInfo, saveStudentInfo, deleteStudent}
const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/student/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const loginStudent = async (req, res) => {
    let data = parseBody(req)
    let warningMessage = handlingErrors.validateLogin(data.studentID, data.password)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        return await executeQuery(req, data)
    }
}

function parseBody(req) {
    return {
        studentID: req.body.id,
        password: req.body.password
    }
}

async function executeQuery(req, data) {
    let sql = makeQuery(data.studentID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                req.session.warningMessage = 'This student account doesn\'t exist!'
                resolve(0);
            } else {
                if (results[0].password !== data.password) {
                    req.session.warningMessage = 'The password is wrong!'
                    resolve(0);
                } else {
                    req.session.user = {id: data.studentID, userType: 'student'};
                    resolve(1);
                }
            }
        });
    });
}

function makeQuery(studentID) {
    return `select *
            from students
            where id = ${studentID}`
}

module.exports = {loginStudent}
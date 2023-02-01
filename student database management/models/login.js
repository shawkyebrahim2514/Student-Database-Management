const mysql = require("mysql2");
const handlingErrors = require("../public/javascript/handlingErrors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const loginStudent = (req, res) => {
    let studentID = req.body.id;
    let password = req.body.password
    // check for errors
    let warningMessage = handlingErrors.validateLogin(studentID, password)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return res.redirect("login")
    } else {
        let sql = `select *
                   from students
                   where id = ${studentID}`
        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                req.session.warningMessage = 'This student account doesn\'t exist!'
                res.redirect('/login')
            } else {
                if (results[0].password !== password) {
                    req.session.warningMessage = 'The password is wrong!'
                    res.redirect('/login')
                }
                else {
                    req.session.updatedData = {studentID}
                    console.log(req.session.updatedData)
                    res.redirect('/profile')
                }
            }
        });
    }
}

module.exports = {loginStudent}
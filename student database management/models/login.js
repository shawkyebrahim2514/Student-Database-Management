const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'student_db'
});

const loginStudent = (req, res) => {
    let studentID = req.body.id;
    let password = req.body.password
    // check if the given id is already exist in the database or not
    let sql = `select *
               from students
               where id = ${studentID}`
    connection.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length === 0)
            res.redirect('/login')
        else {
            if (results[0].password !== password)
                res.redirect('/login')
            else {
                req.session.updatedData = {studentID}
                res.redirect('/profile')
            }
        }
    });
}

module.exports = {loginStudent}
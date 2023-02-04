const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'admin_db'
});

const loginAdmin = async (req) => {
    let data = parseBody(req)
    // check for errors
    let warningMessage = handlingErrors.validateLogin(data.adminID, data.password)
    if (warningMessage) {
        req.session.warningMessage = warningMessage
        return 0;
    } else {
        await executeQuery(req, data)
    }
}

function parseBody(req) {
    return {
        adminID: req.body.id,
        password: req.body.password
    }
}

async function executeQuery(req, data) {
    let sql = makeQuery(data.adminID)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            if (results.length === 0) {
                req.session.warningMessage = 'This admin doesn\'t exist!'
                resolve(0);
            } else {
                if (results[0].password !== data.password) {
                    req.session.warningMessage = 'The password is wrong!'
                    resolve(0);
                } else {
                    req.session.user = {id: data.adminID, userType: 'admin'};
                    resolve(1);
                }
            }
        });
    });
}

function makeQuery(adminID) {
    return `select *
            from admins
            where id = '${adminID}'`
}

module.exports = {loginAdmin}
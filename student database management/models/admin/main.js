const mysql = require("mysql2");
const handlingErrors = require("../../public/javascript/admin/handling-errors");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shawky',
    database: 'admin_db'
});

async function showAdminInfo(req) {
    let sql = makeQuery(req)
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) throw err;
            req.session.user = {
                id: req.session.user.id, firstName: results[0].firstName, lastName: results[0].lastName,
                phoneNumber: results[0].phoneNumber, email: results[0].email, userType: 'admin'
            }
            resolve(0)
        });
    });
}

function makeQuery(req) {
    return `select admin_db.personalData.firstName   as firstName,
                   admin_db.personalData.lastName    as lastName,
                   admin_db.personalData.phoneNumber as phoneNumber,
                   admin_db.personalData.email       as email
            from admins
                     join personalData on admins.id = admin_db.personalData.adminID
            where admins.id = '${req.session.user.id}'`
}

module.exports = {showAdminInfo}
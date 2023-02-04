const utilityFunctions = require('../../../public/javascript/student/utility-functions')
const deleteStudent = (req) => {
    let sql = `delete
               from students
               where id = ${req.session.user.id}`
    utilityFunctions.executeSingleQuery(sql)
}

module.exports = {deleteStudent}
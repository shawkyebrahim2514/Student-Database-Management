const handlingErrors = require("../../../public/javascript/student/handling-errors")
const utilityFunctions = require('../../../public/javascript/student/utility-functions')
const saveStudentInfo = async (req) => {
    let data = parseBody(req)
    data['studentID'] = req.session.user.id
    let warningMessage = handlingErrors.validateEditingProfile(data)
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
        lastName: req.body.lastName,
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
    await utilityFunctions.executeSingleQuery(studentSQL)
    let personalSQL = `update personalData
                       set firstName = '${data.firstName}',
                           lastName  = '${data.lastName}'
                       where studentID = ${data.studentID}`;
    await utilityFunctions.executeSingleQuery(personalSQL)
    let contactSQL = `update contactData
                      set email       = '${data.email}',
                          phoneNumber = '${data.phoneNumber}',
                          address     = '${data.address}'
                      where studentID = ${data.studentID}`;
    await utilityFunctions.executeSingleQuery(contactSQL)
    let academicSQL = `update academicData
                       set level = '${data.level}',
                           gpa   = '${data.gpa}'
                       where studentID = ${data.studentID}`;
    await utilityFunctions.executeSingleQuery(academicSQL)
}

module.exports = {saveStudentInfo}
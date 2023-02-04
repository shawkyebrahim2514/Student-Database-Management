const model = require('../../models/student/login')
const handleErrors = require("../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../public/javascript/student/utility-functions");

const get = ('/', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin)
        return res.redirect('/profile');
    else {
        let messages = utilityFunctions.parseMessages(req)
        res.render('student/login', {
            warningMessage: messages.warningMessage,
            successfulMessage: messages.successfulMessage
        });
    }
});

const post = ('/', async (req, res) => {
    let state = await model.loginStudent(req)
    if (state) {
        return res.redirect('/profile')
    } else {
        return res.redirect('/login')
    }
});

module.exports = {get, post}
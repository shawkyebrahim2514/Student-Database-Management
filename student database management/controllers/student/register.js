const model = require("../../models/student/register");
const handleErrors = require("../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../public/javascript/student/utility-functions");

const get = ('/', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        return res.redirect('/profile');
    } else {
        let messages = utilityFunctions.parseMessages(req)
        res.render('student/register', {warningMessage: messages.warningMessage});
    }
});

const post = ('/', async (req, res) => {
    let state = await model.registerStudent(req)
    if (state) {
        return res.redirect('/login')
    } else {
        return res.redirect('/register')
    }
});

module.exports = {get, post}
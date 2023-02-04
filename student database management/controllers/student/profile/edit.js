const handleErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");
const model = require("../../../models/student/profile/edit");

const get = ('/edit', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let user = req.session.user.info
        let messages = utilityFunctions.parseMessages(req)
        res.render('student/profile/edit', {user, warningMessage: messages.warningMessage})
    } else {
        return res.redirect('/')
    }
});

const post = ('/edit', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let isSuccessful = await model.saveStudentInfo(req)
        if (isSuccessful) {
            req.session.user.info = {}
            return res.redirect('/profile');
        } else {
            return res.redirect('/profile/edit')
        }
    } else {
        return res.redirect('/profile/edit');
    }
});

module.exports = {get, post}
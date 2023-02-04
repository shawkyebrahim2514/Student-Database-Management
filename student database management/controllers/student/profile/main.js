const model = require('../../../models/student/profile/main')
const handleErrors = require("../../../public/javascript/student/handling-errors");

const get = ('/', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        if (!req.session.user.info || !req.session.user.info.length) {
            await model.showStudentInfo(req)
        }
        let user = req.session.user.info
        return res.render('student/profile/main', {user})
    } else {
        return res.redirect('/')
    }
});

module.exports = {get}
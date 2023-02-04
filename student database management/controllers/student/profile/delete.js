const handleErrors = require("../../../public/javascript/student/handling-errors");
const model = require("../../../models/student/profile/delete");

const get = ('/delete', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        model.deleteStudent(req)
        req.session.destroy()
    }
    res.redirect('/')
});

module.exports = {get}
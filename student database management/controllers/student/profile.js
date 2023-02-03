const model = require('../../models/student/profile')
const handleErrors = require("../../public/javascript/student/handling-errors");

const getStudent = ('/', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        if (!req.session.user.info || !req.session.user.info.length) {
            await model.showStudentInfo(req, res)
        }
        let user = req.session.user.info
        res.render('student/profile', {user})
    } else {
        return res.redirect('/')
    }

});

const getEdit = ('/edit', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let user = req.session.user.info
        let messages = handleErrors.parseMessages(req)
        res.render('student/edit-profile', {user, warningMessage: messages.warningMessage})
    } else {
        return res.redirect('/')
    }

});

const postEdit = ('/edit', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        await model.saveStudentInfo(req, res)
        req.session.user.info = {}
        res.redirect('/profile');
    } else {
        return res.redirect('/profile/edit');
    }

});

const deleteStudent = ('/delete', (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        model.deleteStudent(req, res)
        req.session.destroy()
    }
    res.redirect('/')
});

module.exports = {getStudent, getEdit, postEdit, deleteStudent}
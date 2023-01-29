const model = require('../models/profile')

const getStudent = ('/', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.showStudentInfo(req, res)
});

const getEdit = ('/edit', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.editStudentInfo(req, res)
});

const postEdit = ('/edit', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.saveStudentInfo(req, res)

    res.redirect('/profile');
});

const deleteStudent = ('/delete', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.deleteStudent(req, res)

    req.session.destroy()

    res.redirect('/')
});

module.exports = {getStudent, getEdit, postEdit, deleteStudent}
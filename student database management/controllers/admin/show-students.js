const model = require('../../models/admin/show-students')
const handlingErrors = require('../../public/javascript/admin/handling-errors')
const utilityFunctions = require("../../public/javascript/admin/utility-functions");

const get = (req, res) => {
    let isAdmin = handlingErrors.checkAdmin(req);
    if (isAdmin) {
        let students = parseStudents(req)
        let messages = utilityFunctions.parseMessages(req)
        res.render('admin/show-students', {
            students,
            warningMessage: messages.warningMessage
        })
    } else {
        res.redirect('/')
    }
}

function parseStudents(req) {
    let students = req.session.students
    req.session.students = []
    return students
}

const post = async (req, res) => {
    await model.showStudents(req);
    res.redirect('/admin/show-students')
}

module.exports = {get, post}
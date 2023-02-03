const model = require('../../models/admin/delete-students')
const handlingErrors = require('../../public/javascript/admin/handling-errors')
const utilityFunctions = require("../../public/javascript/admin/utility-functions");

const get = (req, res) => {
    let isAdmin = handlingErrors.checkAdmin(req);
    if (isAdmin) {
        let messages = utilityFunctions.parseMessages(req)
        res.render('admin/delete-students', {
            warningMessage: messages.warningMessage,
            successfulMessage: messages.successfulMessage
        })
    } else {
        res.redirect('/')
    }
}

const post = async (req, res) => {
    await model.deleteStudents(req);
    res.redirect('/admin/delete-students')
}

module.exports = {get, post}
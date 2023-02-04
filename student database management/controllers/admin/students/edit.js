const model = require('../../../models/admin/students/edit')
const handlingErrors = require('../../../public/javascript/admin/handling-errors')
const utilityFunctions = require('../../../public/javascript/admin/utility-functions')

const get = (req, res) => {
    let isAdmin = handlingErrors.checkAdmin(req);
    if (isAdmin) {
        let messages = utilityFunctions.parseMessages(req)
        res.render('admin/students/edit', {
            warningMessage: messages.warningMessage,
            successfulMessage: messages.successfulMessage
        })
    } else {
        res.redirect('/')
    }
}

const post = async (req, res) => {
    await model.editStudents(req)
    res.redirect('/admin/edit-students')
}

module.exports = {get, post}
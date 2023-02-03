const model = require('../../models/admin/login')
const handlingErrors = require('../../public/javascript/admin/handling-errors')
const utilityFunctions = require("../../public/javascript/admin/utility-functions");

const get = ('/', (req, res) => {
    let isAdmin = handlingErrors.checkAdmin(req);
    if (isAdmin) {
        res.redirect('/admin')
    } else {
        let messages = utilityFunctions.parseMessages(req)
        res.render('admin/login', {warningMessage: messages.warningMessage});
    }
});

const post = ('/', async (req, res) => {
    let state = await model.loginAdmin(req, res)
    console.log(req.session.warningMessage)
    if (!state) {
        return res.redirect("/admin/login")
    } else {
        return res.redirect('/admin');
    }
});

module.exports = {get, post}
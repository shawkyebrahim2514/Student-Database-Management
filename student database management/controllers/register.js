const model = require("../models/register");

const get = ('/', (req, res) => {
    // if already the user log in
    if (req.session.updatedData)
        return res.redirect('/profile');
    else {
        let warningMessage = req.session.warningMessage
        req.session.warningMessage = ''
        res.render('register', {warningMessage});
    }
});

const post = ('/', (req, res) => {
    model.registerStudent(req, res)
});

module.exports = {get, post}
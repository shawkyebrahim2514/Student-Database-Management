const model = require('../models/login')

const get = ('/', (req, res) => {
    // if already the user log in
    if (req.session.updatedData)
        return res.redirect('/profile');
    else {
        let warningMessage = req.session.warningMessage;
        req.session.warningMessage = '';
        res.render('login', {warningMessage});
    }
});

const post = ('/', (req, res) => {
    model.loginStudent(req, res)
});

module.exports = {get, post}
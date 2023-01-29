const model = require("../models/register");

const get = ('/', (req, res) => {
    // if already the user log in
    if (req.session.updatedData)
        return res.redirect('/profile');
    else
        res.render('register');
});

const post = ('/', (req, res) => {
    model.registerStudent(req, res)
    res.redirect('/');
});

module.exports = {get, post}
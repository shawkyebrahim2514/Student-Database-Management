const model = require('../../models/admin/main')
const handlingErrors = require('../../public/javascript/admin/handling-errors')

const get = ('/', async (req, res) => {
    let isAdmin = handlingErrors.checkAdmin(req);
    if (isAdmin) {
        await model.showAdminInfo(req)
        let user = req.session.user
        res.render('admin/main', {user})
    } else {
        res.redirect('/admin/login');
    }
});

module.exports = {get}
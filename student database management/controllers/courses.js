const model = require('../models/courses')

const getCourses = ('/', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.showCoursesCards(req, res)
});

const getAddingCourse = ('/add', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData)
        return res.redirect('/');

    model.getAddingPage(req, res);
});

const postAddingCourse = ('/add', (req, res) => {
    model.saveNewCourse(req, res)
});

const getEditingCourse = ('/:id/edit', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.showCourseInfo(req, res)
});

const postEditingCourse = ('/:id/edit', (req, res) => {
    model.updateCourse(req, res)
});

const getDeleteCourse = ('/:id/delete', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.deleteCourse(req, res)
});

module.exports = {
    getCourses, getAddingCourse, postAddingCourse, getEditingCourse, postEditingCourse,
    getDeleteCourse
}
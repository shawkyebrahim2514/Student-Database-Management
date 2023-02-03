const handleErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");
const model = require("../../../models/student/courses/add-course");

const get = ('/add', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let messages = utilityFunctions.parseMessages(req)
        res.render('student/add-course', {
            allCoursesOptions: req.session.allCoursesOptions, warningMessage: messages.warningMessage
        })
    } else {
        return res.redirect('/');
    }

});

const post = ('/add', async (req, res) => {
    let state = await model.saveNewCourse(req, res)
    if (state) {
        req.session.studentCourses = []
        return res.redirect('/courses')
    } else {
        return res.redirect("/courses/add")
    }
});

module.exports = {get, post}
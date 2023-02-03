const model = require('../../../models/student/courses/main')
const handleErrors = require("../../../public/javascript/student/handling-errors");

const getCourses = ('/', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        if (!req.session.studentCourses || !req.session.studentCourses.length) {
            await model.showCoursesPage(req, res)
        }
        res.render('student/courses', {courses: req.session.studentCourses})
    } else {
        return res.redirect('/');
    }
});

module.exports = {getCourses}
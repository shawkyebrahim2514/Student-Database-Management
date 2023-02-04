const handleErrors = require("../../../public/javascript/student/handling-errors");
const model = require("../../../models/student/courses/delete");

const get = ('/:courseID/delete', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let state = await model.deleteCourse(req)
        if (state) {
            req.session.studentCourses = []
            return res.redirect('/courses')
        } else {
            return res.redirect(`/courses/${req.params.studentCourseID}/delete`)
        }
    } else {
        return res.redirect('/');
    }
});

module.exports = {get}
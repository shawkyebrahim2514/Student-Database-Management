const handleErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");
const model = require("../../../models/student/courses/edit-course");

const get = ('/:courseID/edit', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let state = await model.get(req, res)
        if (state) {
            let data = getCourseInfo(req)
            let messages = utilityFunctions.parseMessages(req)
            return res.render('student/edit-course', {data, warningMessage: messages.warningMessage})
        } else {
            return res.redirect(`/courses`)
        }
    } else {
        return res.redirect('/');
    }
});

function getCourseInfo(req) {
    let data = req.session.courseInfoPage
    req.session.courseInfoPage = {}
    return data
}

const post = ('/:courseID/edit', async (req, res) => {
    let state = await model.post(req, res)
    if (state) {
        req.session.studentCourses = []
        return res.redirect('/courses')
    } else {
        return res.redirect(`/courses/${req.params.studentCourseID}/edit`)
    }
});

module.exports = {get, post}
const model = require("../../../models/student/notes/add");
const handleErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");

const get = ('/add', async (req, res) => {
    let studentCourseID = req.params.studentCourseID
    let studentID = req.session.user.id
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let state = await model.showPage(req)
        if (state) {
            let messages = utilityFunctions.parseMessages(req)
            let courseInfo = req.session.courseInfo
            req.session.courseInfo = {}
            res.render('student/notes/add', {
                studentCourseID,
                studentID,
                warningMessage: messages.warningMessage,
                courseInfo
            })
        } else {
            res.redirect('/courses')
        }
    } else {
        return res.redirect('/')
    }
});

const post = ('/add', async (req, res) => {
    let isSuccessful = await model.addNewNote(req)
    if (isSuccessful) {
        return res.redirect(`/courses/${req.params.studentCourseID}/notes`)
    } else {
        return res.redirect(`/courses/${req.params.studentCourseID}/notes/add`)
    }
});

module.exports = {get, post}
const model = require("../../../models/student/notes/edit");
const handleErrors = require("../../../public/javascript/student/handling-errors");
const utilityFunctions = require("../../../public/javascript/student/utility-functions");

const get = ('/:studentCourseID/notes/:noteID/edit', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let state = await model.showPage(req)
        if (state) {
            let noteInfo = req.session.noteInfo
            req.session.noteInfo = {}
            let messages = utilityFunctions.parseMessages(req)
            res.render('student/notes/edit', {
                studentCourseID: req.params.studentCourseID,
                noteID: req.params.noteID,
                noteInfo,
                warningMessage: messages.warningMessage
            })
        } else {
            return res.redirect('/courses')
        }
    } else {
        return res.redirect('/');
    }
});

const post = ('/:studentCourseID/notes/:noteID/edit', async (req, res) => {
    let isSuccessful = await model.updateNote(req)
    if (isSuccessful) {
        return res.redirect(`/courses/${req.params.studentCourseID}/notes`)
    } else {
        return res.redirect(`/courses/${req.params.studentCourseID}/notes/${req.params.noteID}/edit`)
    }
});

module.exports = {get, post}
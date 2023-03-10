const model = require("../../../models/student/notes/delete");
const handleErrors = require("../../../public/javascript/student/handling-errors");

const get = ('/:courseID/notes/:noteID/delete', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let state = await model.deleteNote(req)
        if (state) {
            return res.redirect(`/courses/${req.params.studentCourseID}/notes`)
        } else {
            return res.redirect('/courses')
        }
    } else {
        return res.redirect('/');
    }
});

module.exports = {get}


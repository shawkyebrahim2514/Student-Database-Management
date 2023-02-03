const model = require('../../models/student/notes')
const handleErrors = require("../../public/javascript/student/handling-errors");

const getNotes = ('/', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        let data = req.session.courseNotes
        let state
        // check if the search call this getNotes
        if(data && Object.keys(data).length !== 0){
            state = 1
        } else {
            state = await model.showPage(req, '')
            data = req.session.courseNotes
        }
        if(state) {
            req.session.courseNotes = {}
            return res.render('student/course-notes', {data})
        } else {
            return res.redirect('/courses')
        }
    } else {
        return res.redirect('/');
    }
});

const searchWord = ('/:courseID/notes/search', async (req, res) => {
    let isStudentLogin = handleErrors.checkStudentSession(req)
    if (isStudentLogin) {
        await model.searchNote(req, res)
        return res.redirect(`/courses/${req.params.studentCourseID}/notes`)
    } else {
        return res.redirect('/');
    }
});

module.exports = {getNotes, searchWord}
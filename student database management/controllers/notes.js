const model = require('../models/notes')

const getNotes = ('/', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.showNotes(req, res)
});

const getAddingNote = ('/add', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.showAddingPage(req, res)
});

const postAddingNote = ('/add', (req, res) => {
    model.addNewNote(req, res)
});

const getEditingNote = ('/:courseID/notes/:noteID/edit', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.showEditingPage(req, res)
});

const postEditingNote = ('/:courseID/notes/:noteID/edit', (req, res) => {
    model.updateNote(req, res)
});

const deleteNote = ('/:courseID/notes/:noteID/delete', (req, res) => {
    // prevent any user to access this page if he doesn't log in until now
    if (!req.session.updatedData) {
        res.redirect('/');
        return;
    }
    model.deleteNote(req, res)
});

module.exports = {getNotes, getAddingNote, postAddingNote, getEditingNote, postEditingNote, deleteNote}
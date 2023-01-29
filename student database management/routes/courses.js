const express = require('express');

const controller = require('../controllers/courses');

const notesController = require('../controllers/notes');

// const notesRoute = require('../routes/notes');

const router = express.Router();

router.get('/', controller.getCourses);

router.get('/add', controller.getAddingCourse);

router.get('/:id/edit', controller.getEditingCourse);

router.get('/:id/delete', controller.getDeleteCourse);

router.get('/:id/notes', notesController.getNotes);

router.get('/:id/notes/add', notesController.getAddingNote);

router.get('/:courseID/notes/:noteID/edit', notesController.getEditingNote);

router.get('/:courseID/notes/:noteID/delete', notesController.deleteNote);

router.post('/add', controller.postAddingCourse);

router.post('/:id/edit', controller.postEditingCourse);

router.post('/:id/notes/add', notesController.postAddingNote);

router.post('/:courseID/notes/:noteID/edit', notesController.postEditingNote);


module.exports = router;
const express = require('express');
const coursesController = require('../../controllers/student/courses/main');
const addCourseController = require('../../controllers/student/courses/add')
const editCourseController = require('../../controllers/student/courses/edit')
const deleteCourseController = require('../../controllers/student/courses/delete')
const notesController = require('../../controllers/student/notes/main');
const addNoteController = require('../../controllers/student/notes/add');
const editNoteController = require('../../controllers/student/notes/edit');
const deleteNoteController = require('../../controllers/student/notes/delete');
const router = express.Router();

router.get('/', coursesController.getCourses);

router.get('/add', addCourseController.get);

router.get('/:studentCourseID/edit', editCourseController.get);

router.get('/:studentCourseID/delete', deleteCourseController.get);

router.get('/:studentCourseID/notes', notesController.getNotes);

router.get('/:studentCourseID/notes/add', addNoteController.get);

router.get('/:studentCourseID/notes/:noteID/edit', editNoteController.get);

router.get('/:studentCourseID/notes/:noteID/delete', deleteNoteController.get);

router.post('/add', addCourseController.post);

router.post('/:studentCourseID/edit', editCourseController.post);

router.post('/:studentCourseID/notes/add', addNoteController.post);

router.post('/:studentCourseID/notes/:noteID/edit', editNoteController.post);

router.post('/:studentCourseID/notes/search', notesController.searchWord);

module.exports = router;
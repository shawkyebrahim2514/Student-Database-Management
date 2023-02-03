const express = require('express');

const adminController = require('../../controllers/admin/main');

const loginController = require('../../controllers/admin/login');

const addStudentsController = require('../../controllers/admin/add-students');

const deleteStudentsController = require('../../controllers/admin/delete-students');

const showStudentsController = require('../../controllers/admin/show-students');

const editStudentsController = require('../../controllers/admin/edit-students');

const router = express.Router();

router.get('/', adminController.get);

router.get('/login', loginController.get);

router.get('/add-students', addStudentsController.get);

router.get('/delete-students', deleteStudentsController.get);

router.get('/show-students', showStudentsController.get);

router.get('/edit-students', editStudentsController.get);

router.post('/login', loginController.post);

router.post('/add-students', addStudentsController.post);

router.post('/delete-students', deleteStudentsController.post);

router.post('/show-students', showStudentsController.post);

router.post('/edit-students', editStudentsController.post);

module.exports = router;
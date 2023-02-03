const express = require('express');

const controller = require('../../controllers/student/profile');

const router = express.Router();

router.get('/', controller.getStudent);

router.get('/edit', controller.getEdit);

router.get('/delete', controller.deleteStudent);

router.post('/edit', controller.postEdit);

module.exports = router;
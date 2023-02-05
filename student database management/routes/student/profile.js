const express = require('express');
const controller = require('../../controllers/student/profile/main');
const editController = require('../../controllers/student/profile/edit');
const router = express.Router();

router.get('/', controller.get);

router.get('/edit', editController.get);

router.post('/edit', editController.post);

module.exports = router;
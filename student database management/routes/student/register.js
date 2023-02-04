const express = require('express');
const controller = require('../../controllers/student/register');
const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.post);

module.exports = router;
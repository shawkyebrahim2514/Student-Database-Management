const express = require('express');

const controller = require('../controllers/register');

const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.post);

module.exports = router;
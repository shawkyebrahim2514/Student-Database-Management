const express = require('express');

const controller = require('../controllers/notes');

const router = express.Router();

router.get('/', controller.getNotes);

module.exports = router;
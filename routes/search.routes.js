const express = require('express');
const router = express.Router();
const searchControllers = require('../controllers/search.controllers');

router.get('/', searchControllers.rootSearch);
router.get('/:query', searchControllers.querySearch);

module.exports = router;

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

router.post('/search/:url', searchController.postSearch);
router.get('/search/:url', searchController.postSearchOption);

module.exports = router;
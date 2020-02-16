const express = require('express');
const router = express.Router();
const searchController = require('../controllers/home');

router.get('/', searchController.homePage);

module.exports = router;
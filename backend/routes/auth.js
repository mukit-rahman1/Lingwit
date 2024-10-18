const express = require("express");
const router = express.Router();
const testFunc = require('../controllers/auth');

router.route('/').get(testFunc);

module.exports = router;
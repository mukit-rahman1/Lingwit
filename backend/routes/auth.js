const express = require("express");
const router = express.Router();
const {register, login, sendFrenchIndex, updateFrenchIndex} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);

router.route('/user/:userId').get(sendFrenchIndex);

router.route('/user/:userId').put(updateFrenchIndex);

module.exports = router;
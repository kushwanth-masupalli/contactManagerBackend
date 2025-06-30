const express = require('express');
const router = express.Router();
const {registerUser,loginUser,currentUser}  = require('../Controller/userController')

const {} = require('../Controller/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').post(currentUser);

module.exports = router;
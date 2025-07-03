const express = require('express');
const router = express.Router();
const {registerUser,loginUser,currentUser}  = require('../Controller/userController')
const validate = require('../middleware/authenticateToken');

const {} = require('../Controller/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current').post(validate,currentUser);

module.exports = router;
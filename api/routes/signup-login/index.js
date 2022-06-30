const express = require("express");
const router = express.Router();
require('../../../configs/env.config');
const { login_user, sign_up_user, logout_user } = require("../../controllers/signup-login");

// User login 
router.post('/login', login_user);

// User registration
router.post('/registration', sign_up_user);

// User logout
router.post('/logout', logout_user);


module.exports = router;
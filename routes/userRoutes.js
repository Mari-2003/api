const express = require('express');
const Controller = require('../Controller/loginController');

const router = express.Router()


router.post('/signup',Controller.registerUser)
router.post('/login',Controller.loginuser)
router.get('/access',Controller.accessuser)

module.exports = router;

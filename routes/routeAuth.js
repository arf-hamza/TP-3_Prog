"use strict";

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST login

router.post('/login', authController.login);

// POST signUp

router.post('/signup', authController.signUp);

module.exports = router;
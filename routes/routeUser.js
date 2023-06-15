"use strict";

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require('../middleware/is-auth');

// route GET /users

router.get('/users',userController.getUsers);

// route GET /users/ profil

router.get('/users/profil',isAuth , userController.getProfil);

// route GET /users/:id

router.get('/users/:id', userController.getUser);

// route PUT /users

router.put('/users/:id',isAuth , userController.putUser);

// route DELETE /users

router.delete('/users/:id',isAuth , userController.deleteUser);


module.exports = router;
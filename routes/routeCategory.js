"use strict";

const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoryController');
const isAuth = require('../middleware/is-auth');


// route /categories

router.get('/categories', categoriesController.getCategory);

// route /categories/:id

router.get('/categories/:id', categoriesController.getCategoryId);

// route /categories/add

router.post('/categories',isAuth, categoriesController.addCategory);

// route /categories/:id/edit

router.put('/categories/:id' ,isAuth, categoriesController.putCategory);

// route /categories/:id/delete

router.delete('/categories/:id',isAuth , categoriesController.deleteCategoryById);


module.exports = router;
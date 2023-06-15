const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); // route /produits


// GET /search?query=...

router.get('/search', searchController.searchProducts);

module.exports = router;
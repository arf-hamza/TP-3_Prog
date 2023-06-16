"use strict";

const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController"); // route /produits
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require("../middleware/is-auth");

// GET /produits

router.get("/products", productsController.getProducts);

// GET /products/user/:userId

router.get("/products/user/:userId", productsController.getProductsByUserId);

// GET /produits/:id

router.get("/products/:id", productsController.getProduct);

// POST /produits

router.post("/products", isAuth, productsController.addProduct);

// DELETE /produits/:id

router.delete("/products/:id", productsController.deleteProduct);

module.exports = router;

"use strict";

const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
// isAuth est un middleware qui vérifie si l'utilisateur est authentifié
const isAuth = require("../middleware/is-auth");

// GET / cart

router.get("/cart", isAuth, cartController.getCart);

// PUT / cart

router.put("/cart", isAuth, cartController.putCart);

// DELETE / cart/:id

router.delete("/cart/:id", isAuth, cartController.deleteCart);

module.exports = router;

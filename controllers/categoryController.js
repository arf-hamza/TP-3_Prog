"use strict";

// recupere le modele users
var categories = require("../models/category");

// GET categories
exports.getCategory = function (req, res) {
  categories
    .find({})
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.statues(500).send(error);
    });
};

// GET category by id
exports.getCategoryId = function (req, res) {
  categories
    .findOne({ _id: req.params.id })
    .then((category) => {
      res.json(category);
    })
    .catch((error) => {
      res.statues(500).send(error);
    });
};

// POST category
exports.addCategory = function (req, res) {
  // Vérifier l'autorisation de l'utilisateur (par exemple, en vérifiant son rôle)
  if (req.user.email !== "admin@admin.com") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  var category = new categories();
  category.name = req.body.name;
  category
    .save()
    .then((category) => {
      res.status(201).json(category);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// PUT category by id
exports.putCategory = function (req, res) {
  categories
    .findOne({ _id: req.params.id })
    .then((category) => {
      // seulement l'admin peut modifier les categories
      if (req.user.email !== "admin@admin.com") {
        return res.status(401).json({ message: "Unauthorized" });
      }
      category.name = req.body.name;
      category.save();
      res.status(201).json(category);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

// DELETE category by id
exports.deleteCategoryById = function (req, res) {
  const categoryId = req.params.id;
  // seulement l'admin peut supprimer les categories
  if (req.user.email !== "admin@admin.com") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  categories
    .findOneAndRemove({ _id: categoryId })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete category",
        error: err,
      });
    });
};

"use strict";

// Récupère le modèle Users
const User = require("../models/user");

// GET Users
exports.getUsers = function (req, res) {
  User.find({}, '-email -password') // Exclure les champs d'email et de mot de passe
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};


// GET User by id

exports.getUser = function (req, res) {
  User.findOne({ _id: req.params.id }, { email: 0, password: 0 })
    .populate("cart")
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      // Parcourir les produits du panier de l'utilisateur
      user.cart.forEach((product) => {
        product.isSold = true; // Mettre isSold à true pour les produits du panier
      });
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// GET User profil

exports.getProfil = function (req, res) {
  const user = req.user.userId;
    if (!user) {
    res.status(404).send();
    return;
  }
  User.findById(user)
    .then((user) => {
        if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
      res.status(200).json({ user: user });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// PUT User by id

exports.putUser = function (req, res) {
  const userId = req.params.id;
  const loggedInUserId = req.user.userId;

  if (userId !== loggedInUserId) {
    // L'utilisateur connecté ne correspond pas à l'utilisateur à modifier
    res.status(403).json({ error: "You are not authorized to modify this user" });
    return;
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Vérifier si le champ isAdmin est modifié
      if (req.body.isAdmin !== undefined && req.body.isAdmin !== user.isAdmin) {
        res.status(403).json({ error: "You are not authorized to modify the isAdmin field" });
        return;
      }

      // Mettre à jour les champs autorisés
      user.name = req.body.name || user.name;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;

      user.save()
        .then((updatedUser) => {
          res.status(201).json(updatedUser);
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// DELETE User by id
exports.deleteUser = function (req, res) {
  const loggedInUserId = req.user.userId; // Récupérer l'ID de l'utilisateur connecté
  const userId = req.params.id; // Récupérer l'ID de l'utilisateur à supprimer

  if (loggedInUserId !== userId) {
    return res.status(401).json({ error: "You are not authorized to delete this user." });
  }

  User.findByIdAndRemove(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(204).send();
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};



"use strict";

// Récupère le modèle Users
const User = require('../models/user');
const Product = require('../models/product');



// GET / cart
exports.getCart = function (req, res) {
  // Récupérer le panier de l'utilisateur connecté
  User.findById(req.user.userId)
    .populate('cart', '_id title price description categoryId imageUrl userId',) // Projection sur les champs  du panier
    .then(user => {
      if (!user) {
        // L'utilisateur n'a pas été trouvé, retourner une réponse d'erreur
        res.status(404).json({ error: 'User not found' });
        return;
      }
      // Vérifier si le panier de l'utilisateur est vide
      if (user.cart.length === 0) {
        res.status(404).json({ error: 'Cart is empty' });
        return;
      }
      // Retourner le panier de l'utilisateur connecté
      res.json(user.cart);
    })
    .catch(error => {
      console.error('Error getting cart:', error);
      res.status(401).json({ error: 'An error occurred while getting the cart' });
    });
};

  
// PUT / cart

  exports.putCart = function (req, res) {
    // Récupérer l'ID du produit à ajouter au panier
    const productId = req.body.id;
    const userId = req.user.userId;
  
    Product.findById(productId)
      .then((product) => {
        if (!product) {
          // Le produit n'a pas été trouvé, retourner une réponse d'erreur
          res.status(404).json({ error: "Product not found" });
          return;
        }
        if (product.isSold) {
          // Le produit a déjà été vendu, retourner une réponse d'erreur
          res.status(400).json({ error: "Product already sold" });
          return;
        }
  
        User.findById(userId)
          .then((user) => {
            if (!user) {
              // L'utilisateur n'a pas été trouvé, retourner une réponse d'erreur
              res.status(404).json({ error: "User not found" });
              return;
            }
  
            // Vérifier si le produit existe déjà dans le panier de l'utilisateur
            const isProductInCart = user.cart.includes(productId);
             if (isProductInCart) {
              // Le produit existe déjà dans le panier, retourner une réponse d'erreur
              res.status(400).json({ error: "Product already in cart" });
              return;
            } 
  
            // Ajouter le produit au panier de l'utilisateur connecté
            user.cart.push(productId);
            user.save();
  
            // Mettre à jour la valeur de isSold à true pour le produit
            product.isSold = true;
            product.save();
  
            res.status(201).json("Product added to cart successfully").send();
          })
          .catch((error) => {
            console.error("Error adding product to cart:", error);
            res
              .status(500)
              .json({ error: "An error occurred while adding the product to the cart" });
          });
      })
      .catch((error) => {
        console.error("Error finding product:", error);
        res.status(500).json({ error: "An error occurred while finding the product" });
      });
  };
  

 // DELETE / cart/:id

 exports.deleteCart = function (req, res) {
  const userId = req.user.userId;
  const productId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        // L'utilisateur n'a pas été trouvé, retourner une réponse d'erreur
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Vérifier si le produit existe dans le panier de l'utilisateur
      const index = user.cart.indexOf(productId);
      if (index === -1) {
        // Le produit n'a pas été trouvé dans le panier de l'utilisateur, retourner une réponse d'erreur
        res.status(404).json({ error: "Product not found in the cart" });
        return;
      }

      // Supprimer le produit du panier de l'utilisateur
      user.cart.splice(index, 1);
      user.save();

      // Mettre à jour la valeur de isSold à false pour le produit
      Product.findById(productId)
        .then((product) => {
          if (product) {
            product.isSold = false;
            product.save();
          }
          // Produit supprimé avec succès du panier de l'utilisateur
          res.status(204).send();
        })
        .catch((error) => {
          console.error("Error updating isSold for product:", error);
          res.status(500).json({ error: "An error occurred while updating the product" });
        });
    })
    .catch((error) => {
      console.error("Error deleting product from cart:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the product from the cart" });
    });
};

      
      

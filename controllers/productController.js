"use strict";

// Récupère le modèle products
var Product = require('../models/product');



// GET products
exports.getProducts = function (req, res) {
  Product.find({})
    .then(products => {
      const updatedProducts = products.map(product => {

        const imageUrls = product.imageUrl;

        // Ajouter les URL d'image au produit
        product.imageUrl = imageUrls;

        return product;
      });

      // Retourner les produits mis à jour
      res.status(200).json(updatedProducts);
    })
    .catch(error => {
      console.error('An error occurred while retrieving products :', error);
      res.status(500).json({ error: 'An error occurred while retrieving products' });
    });
};


// GET product by id

exports.getProduct = function (req, res) {
  const productId = req.params.id;

  Product.findById(productId)
    .then(product => {
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      // Sélectionner un seul index aléatoire pour l'URL d'image
      const randomIndex = Math.floor(Math.random() * product.imageUrl.length);
      const imageUrl = product.imageUrl[randomIndex];
      product.imageUrl = imageUrl;

      res.status(200).json(product);
    })
    .catch(error => {
      console.error('Error retrieving product:', error);
      res.status(500).json({ error: 'An error occurred while retrieving the product' });
    });
};


// POST product

exports.addProduct = function (req, res) {
  const userId = req.user.userId; // Récupérer l'ID de l'utilisateur connecté
  const { title, description, price, imageUrl, categoryId } = req.body;

  const product = new Product({
    userId,
    isSold: false,
    title,
    description,
    price,
    imageUrl,
    categoryId,
  });

  product.save()
    .then(savedProduct => {
      const result = {
        _id: savedProduct._id,
        userId: savedProduct.userId,
        isSold: savedProduct.isSold,
        price: savedProduct.price,
        title: savedProduct.title,
        description: savedProduct.description,
        categoryId: savedProduct.categoryId,
        imageUrl: savedProduct.imageUrl,
        createdAt: savedProduct.createdAt,
      };

      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
};


// DELETE product

exports.deleteProduct = function (req, res) {
  Product.findByIdAndRemove(req.params.id)
      .then(product => {
          if (!product) {
              // Le produit n'a pas été trouvé, retourner une réponse d'erreur
              res.status(404).json({ error: "Product not found" });
              return;
          }

          // Produit supprimé avec succès
          res.status(204).send();
      })
      .catch(error => {
          res.status(500).send(error);
      });
};


// GET /products/user/:userId

exports.getProductsByUserId = function (req, res) {
  const userId = req.params.userId;

  Product.find({ userId: userId })
    .then(products => {
      console.log(products);
      res.status(200).json({ products: products });
    })
    .catch(error => { 
      res.status(500).json({ error: 'An error occurred while retrieving products' });
    });
};
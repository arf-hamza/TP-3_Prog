"use strict";

// Récupère le modèle products
var Product = require('../models/product');


// GET search

exports.searchProducts = function (req, res) {
    // Récupérer le paramètre 'q' de la requête
    const searchQuery = req.query.q;
    

    
    // Effectuer la recherche en utilisant le paramètre 'q'

    Product.find({ title: { $regex: searchQuery, $options: 'i' } })
    .populate('userId')
    .then(products => {
      // Retourner la liste des produits correspondants en tant que réponse JSON
      if(products.length === 0 || !products) {
        res.status(404).json({ error: 'No products found' });
      }
      res.json(products);
    })
    .catch(error => {
        console.error('Error searching for products:', error);
        res.status(500).json({ error: 'An error occurred while searching for products' });
    });
}; 

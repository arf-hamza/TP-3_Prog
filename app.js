"use strict";

const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Authentification par JWT
const jwt = require('jsonwebtoken');

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
   res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
   );
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
  });

// middleware pour format Json
app.use(express.json());

// Importe les routes

const userRoutes = require('./routes/routeUser');
const productRoutes = require('./routes/routeProduct');
const categoryRoutes = require('./routes/routeCategory');
const authRoutes = require('./routes/routeAuth');
const searchRoutes = require('./routes/routeSearch');
const cartRoutes = require('./routes/routeCart');




// Importe le controller des erreurs
const errorController = require('./controllers/errorController');


// Déclarer le dossier public qui contient les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));


// Déclaration d'un parser pour analyser "le corps (body)" d'une requête entrante avec POST  
app.use(express.urlencoded({
  extended: false
}));


// utilistation route pour categories
app.use(categoryRoutes);

// utilistation route pour produits
app.use(productRoutes);

// utilistation route pour users
app.use(userRoutes);

// utilistation route pour authentification
app.use(authRoutes);

// utilistation route pour search
app.use(searchRoutes);

// utilistation route pour cart
app.use(cartRoutes);


// gestion des erreurs 401
app.use(errorController.get401);

// gestion des erreurs 404
app.use(errorController.get404);

// gestion des erreurs 422
app.use(errorController.get422);

// gestion des erreurs 
app.use(errorController.logErrors);

const PORT = process.env.PORT || 3000;


// Connexion à la base de données
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Database connection established')
    app.listen(PORT, () => {
      console.log('The server is listening on the port', PORT);
    });
  })
  .catch(err => {
    console.log('Database connection failed', err)
  })




"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/user");

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("loadedUser", email, password);

  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found !");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      console.log("loadedUser", loadedUser);
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password !");
        error.statusCode = 422;
        throw error;
      }
      const token = jwt.sign(
        {
          firstname: loadedUser.firstname,
          lastname: loadedUser.lastname,
          email: loadedUser.email,
          city: loadedUser.city,
          userId: loadedUser._id.toString(),
        },
        process.env.SECRET_JWT,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      if (err.name === "TokenExpiredError") {
        res.status(401).json("Token expired, please authenticate again");
      } else {
        next(err);
      }
    });
};

// Enregistre un utilisateur dans la bd
exports.signUp = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const city = req.body.city;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin;

  // Utilisation de bcrypt pour hacher le mot de passe
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        city: city,
        password: hashedPassword,
        isAdmin: isAdmin,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created !", userId: result.id });
    })
    .catch((err) => {
      const error = new Error("Wrong password !");
      error.statusCode = 422;
      res.status(422).json({ error: err.message });
      next(err);
    });
};

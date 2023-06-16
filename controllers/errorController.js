"use strict";

exports.get404 = (err, req, res, next) => {
  console.error(`error found ! ${err.stack}`);
  res.status(404).send("page not found !");
};

exports.logErrors = (err, req, res, next) => {
  console.error(`error found ! ${err.stack}`);
  res.status(500).send("Ouups! something went wrong !");
};

exports.get422 = (err, req, res, next) => {
  console.error(`error found ! ${err.stack}`);
  res.status(422).send("Unprocessable Entity !");
};

// get 401 error
exports.get401 = (err, req, res, next) => {
  console.error(`error found ! ${err.stack}`);
  res.status(401).send("Token expired, please authenticate again !");
};

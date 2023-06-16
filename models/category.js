"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of category is required"],
    maxlingth: [50, "Name of category must not exceed 50 characters"],
  },
});

module.exports = mongoose.model("Category", categorySchema);

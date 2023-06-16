"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLenght: [3, "Title must be at least 3 characters"],
      maxLenght: [50, "Title must not exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Discription is required"],
      maxLenght: [255, "Discription must not exceed 255 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    imageUrl: {
      type: [String],
      required: [true, "Image is required"],
      maxLenght: [255, "Image must not exceed 255 characters"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productsSchema);

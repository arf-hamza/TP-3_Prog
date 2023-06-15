const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required !"],
      minlength: [3, "Firstname must be at least 3 characters"],
      maxlength: [50, "Firstname must not exceed 50 characters"]
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required !"],
      minlength: [3, "Lastname must be at least 3 characters"],
      maxlength: [50, "Lastname must not exceed 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required !"],
        maxlength: [50, "Email must not exceed 50 characters"],
        unique: [true, "Email already exist"],
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "L'email n'est pas valide"],

      },
    city: {
            type: String,
            required: [true, "City is required !"],
            maxlength: [50, "City must not exceed 50 characters"]
        },
    password: {
        type: String,
        required: [true, "Password is required !"],
        minlength: [6, "Password must be at least 6 characters"],
        },
    isAdmin: {
      type: String,
      required: [false]
    },
    cart: {
        type: Array,
        ref: 'Product',
        default: []
    }
  },
  { timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);


const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: {
    Type: String,
    required: true,
    trim: true,
  },
  code: {
    Type: String,
    required: true,
    trim: true,
  },
  price: {
    Type: Number,
    required: true,
  },
  quantity: {
    Type: Number,
    required: true,
  },
  images: {
    Type: [String],
    required: true,
  },
});

module.exports = {
  Product: mongoose.model("Product", productScheme),
};

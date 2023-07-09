const { Product } = require("../models/products.model");

const methods = {
  async addProduct({ name, code, price, quantity, images }) {
    const product = new Product({
      name,
      code,
      price,
      quantity,
      images,
    });
    await product.save();
    return product;
  },
  async getProducts({ searchTerm }) {
    const product = await Product.find({
      $or: [
        {
          name: new RegExp(searchTerm, "i"),
        },
        {
          code: new RegExp(searchTerm, "i"),
        },
      ],
    }).sort({
      _id: -1,
    });
    return product;
  },
  async getProductByID(id) {
    const product = await Product.findById(id);
    return product;
  },
};

module.exports = { ...methods };

const db = require("../repositories/products.repository");

const methods = {
  async addProduct(req, res) {
    const { name, code, price } = req.body;
    const images = req.files;

    const BASE_URL = `${req.protocol}://${req.get("host")}/static/`;

    try {
      const product = await db.addProduct({
        name,
        code,
        price,
        quantity: 1,
        images: images.map((file) => BASE_URL + file.filename),
      });
      res.json({
        data: {
          product,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  },
  async getProducts(req, res) {
    const { q } = req.query;
    try {
      const results = await db.getProducts({
        searchTerm: q,
      });

      res.json({
        data: {
          results,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  },
  async getProductByID(req, res) {
    const { id } = req.params;
    try {
      const product = await db.getProductByID(id);
      res.json({
        data: {
          product,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message);
    }
  },
};

module.exports = { ...methods };

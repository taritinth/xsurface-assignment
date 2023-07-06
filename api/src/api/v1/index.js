const express = require("express");
const router = express.Router();

const products = require("./controllers/products.controller");

router.post("/products", products.addProduct);
router.get("/products", products.getProducts);
router.get("/products/:id", products.getProductByID);

module.exports = router;

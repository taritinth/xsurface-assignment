const express = require("express");
const router = express.Router();

const products = require("./controllers/products.controller");

const { upload } = require("./helpers/multer.helper");
const { validateMiddleware } = require("./middlewares/validate.middleware");
const schema = require("./validations/products.schema");

router.post(
  "/products",
  upload(schema.addProduct).array("images", 6),
  validateMiddleware(schema.addProduct),
  products.addProduct
);
router.get("/products", products.getProducts);
router.get("/products/:id", products.getProductByID);

module.exports = router;

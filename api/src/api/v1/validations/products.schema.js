const joi = require("joi");

const schema = {
  addProduct: joi.object({
    body: joi.object({
      name: joi.string().required(),
      code: joi.string().required(),
      price: joi.number().integer().required(),
    }),
    files: joi.array().min(1).max(6).required(),
  }),
  getProductByID: joi.object({
    params: joi.object({
      id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  }),
};

module.exports = { ...schema };

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
};

module.exports = { ...schema };

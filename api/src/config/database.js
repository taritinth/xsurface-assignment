const mongoose = require("mongoose");

const connectDatabase = () =>
  new Promise((resolve, reject) => {
    try {
      mongoose.connect(process.env.ATLAS_URI);
      mongoose.connection.once("open", () => {
        console.log("MongoDB connection established successfully");
        resolve();
      });
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });

module.exports = { connectDatabase };

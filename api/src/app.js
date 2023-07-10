const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const { logger } = require("./helpers");
const { connectDatabase } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8080;

const router = require("./api");

app.use("/static", express.static("uploads"));

let whitelist = ["http://localhost:3000", "http://18.141.111.207"];

let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger);
app.use(router);

app.get("/", (req, res) => {
  res.send("OK");
});

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});

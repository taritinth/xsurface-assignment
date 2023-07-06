const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const { logger } = require("./helpers");
const { connectDatabase } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8080;

const router = require("./api");

app.use(cors());
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

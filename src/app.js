require("dotenv").config();
const express = require("express");
// Use morgan to log requests to the console
const morgan = require("morgan");
// Use compression to compress responses
const compression = require("compression");
// Use helmet to secure Express apps by setting various HTTP headers
const helmet = require("helmet");

// Content
const app = express();

// init middlewares
app.use(morgan("dev")); // "dev" | "common" | "short" | "tiny" | "combined
app.use(helmet());
app.use(compression());

// init db
require("./dbs/init.mongodb");

// Check overload connection
const { checkOverload } = require("./helpers/check.connect");
checkOverload();

// init routes
app.get("/", (req, res, next) => {
  const strCompress = "HEllo from tips js";
  return res.status(200).json({
    message: "Hello World",
    metadata: strCompress.repeat(10000),
  });
});

// handling errors

module.exports = app;

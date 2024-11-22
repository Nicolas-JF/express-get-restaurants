const express = require("express");
const restaurantsRouter = require("./routes/restaurant");
const app = express();

app.use("/restaurants", restaurantsRouter);

module.exports = app;
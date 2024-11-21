const express = require("express");
const { Restaurant } = require("../models");
const app = express();
const port = 3000;

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).send("Restaurant not found");
  }
});

module.exports = app

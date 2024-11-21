const express = require("express");
const { Restaurant } = require("./models");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/restaurants", async (req, res) => {
  try {
    const { name, location, cuisine } = req.body;
    const newRestaurant = await Restaurant.create({
      name,
      location,
      cuisine,
    });
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, cuisine } = req.body;
    const restaurant = await Restaurant.findByPk(id);

    if (restaurant) {
      await restaurant.update({ name, location, cuisine });
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const rowsDeleted = await Restaurant.destroy({
      where: { id },
    });

    if (rowsDeleted > 0) {
      res.status(200).json({ message: "Restaurant deleted successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app

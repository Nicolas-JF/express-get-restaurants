const express = require("express");
const { Restaurant } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

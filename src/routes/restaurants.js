const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const restaurantData = [
  { name: "Bobs Burgers", location: "New York City", cuisine: "American" },
  { name: "Harry's Fish Shack", location: "London", cuisine: "Seafood" },
  { name: "Elizabeth's Hot Dogs", location: "Chicago", cuisine: "Fast Food" },
];

router.use(express.json());

router.get("/", (req, res) => {
  res.json(restaurantData);
});

router.post(
  "/",
  [
    check("name", "Name is required and cannot be empty or whitespace").trim().notEmpty(),
    check("location", "Location is required and cannot be empty or whitespace").trim().notEmpty(),
    check("cuisine", "Cuisine is required and cannot be empty or whitespace").trim().notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, location, cuisine } = req.body;
    const newRestaurant = { name, location, cuisine };
    restaurantData.push(newRestaurant);
    res.status(200).json(restaurantData);
  }
);

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/restaurants', [
  body('name').trim().notEmpty().withMessage('Name is required and cannot be empty or whitespace'),
  body('location').trim().notEmpty().withMessage('Location is required and cannot be empty or whitespace'),
  body('cuisine').trim().notEmpty().withMessage('Cuisine is required and cannot be empty or whitespace'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const newRestaurant = {
    id: 1,
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine
  };

  return res.status(201).json(newRestaurant);
});

module.exports = app;


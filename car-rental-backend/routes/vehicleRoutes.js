const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicleModel'); // you'll need to create this model

// Get all vehicles
router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Add a new vehicle
router.post('/', async (req, res) => {
  const newVehicle = new Vehicle(req.body);
  await newVehicle.save();
  res.status(201).json(newVehicle);
});

// Delete a vehicle by ID
router.delete('/:id', async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  res.json({ message: 'Vehicle deleted' });
});

module.exports = router;

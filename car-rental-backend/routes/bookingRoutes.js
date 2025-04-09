const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Vehicle = require('../models/vehicleModel');

// Create Booking
router.post('/', async (req, res) => {
  try {
    const { userId, vehicleId, startDate, endDate } = req.body;

    const vehicle = await vehicle.findById(vehicleId);
    if (!vehicle || !vehicle.available) return res.status(400).json({ message: 'Vehicle not available' });

    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const totalCost = days * vehicle.pricePerDay;

    const booking = new Booking({ userId, vehicleId, startDate, endDate, totalCost });
    await booking.save();

    vehicle.available = false;
    await vehicle.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bookings for a user
router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('vehicleId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

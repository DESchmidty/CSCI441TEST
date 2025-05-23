const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);

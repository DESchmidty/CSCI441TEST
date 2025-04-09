const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // Use bcrypt for encryption later
});

module.exports = mongoose.model('User', userSchema);

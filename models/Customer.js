const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  address: String
});

module.exports = mongoose.model('Customer', customerSchema);

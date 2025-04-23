const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  region: String,
  dateOfSale: Date,
  quantitySold: Number,
  unitPrice: Number,
  discount: Number,
  shippingCost: Number,
  paymentMethod: String
});

module.exports = mongoose.model('Sale', saleSchema);

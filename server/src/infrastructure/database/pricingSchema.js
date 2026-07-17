const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  basePricePerLayer: { type: Number, default: 20 },
  baseFlatFee: { type: Number, default: 5 },
  deliveryFee: { type: Number, default: 150 },
  flavors: [
    {
      id: String,
      label: String,
      price: Number,
    },
  ],
  toppings: [
    {
      id: String,
      label: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Pricing', pricingSchema);
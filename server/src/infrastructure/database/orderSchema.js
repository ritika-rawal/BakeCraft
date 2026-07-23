const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cake: {
      shape: String,
      layers: Number,
      flavor: String,
      frosting: String,
      toppings: [String],
      message: String,
      image: String,
      source: String,
      productId: String,
    },
    delivery: {
      firstName: String,
      lastName: String,
      contact: String,
      street: String,
      city: String,
      neighborhood: String,
      deliveryDate: String,
      timeSlot: String,
    },
    payment: {
      method: String,
    },
    pricing: {
      subtotal: Number,
      deliveryFee: Number,
      discount: Number,
      grandTotal: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'baking', 'out-for-delivery', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

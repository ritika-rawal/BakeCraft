const mongoose = require('mongoose');

const savedDesignSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'My Cake Design' },
    shape: String,
    layers: Number,
    flavor: String,
    frosting: String,
    toppings: [String],
    message: String,
    total: Number,
    image: String,
    sourceId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('SavedDesign', savedDesignSchema);

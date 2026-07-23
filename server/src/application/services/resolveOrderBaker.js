const mongoose = require('mongoose');
const userRepository = require('../../infrastructure/repositories/userRepository');
const Product = require('../../infrastructure/database/productSchema');

const findBakerAdmin = async () => {
  const baker = await userRepository.findBakerAdmin();
  if (!baker) {
    throw new Error('The Baker Admin account is not available.');
  }
  return baker._id;
};

exports.resolveOrderBaker = async (cake, { allowProductFallback = false } = {}) => {
  if (!cake?.productId) {
    return findBakerAdmin();
  }

  if (mongoose.isValidObjectId(cake.productId)) {
    const product = await Product.findOne({ _id: cake.productId, isActive: true });
    if (product) return findBakerAdmin();
  }

  if (allowProductFallback) return findBakerAdmin();
  throw new Error('This baker cake is no longer available.');
};

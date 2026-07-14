const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.getMyOrders = async (userId) => {
  return orderRepository.findByUser(userId);
};
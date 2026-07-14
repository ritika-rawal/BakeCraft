const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.getAllOrders = async () => {
  return orderRepository.findAll();
};
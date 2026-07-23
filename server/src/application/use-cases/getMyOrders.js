const orderRepository = require('../../infrastructure/repositories/orderRepository');
const { assignUnassignedOrders } = require('./assignUnassignedOrders');

exports.getMyOrders = async (userId) => {
  await assignUnassignedOrders(userId);
  return orderRepository.findByUser(userId);
};

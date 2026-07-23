const orderRepository = require('../../infrastructure/repositories/orderRepository');
const { assignUnassignedOrders } = require('./assignUnassignedOrders');

exports.getAllOrders = async (bakerId) => {
  await assignUnassignedOrders();
  return orderRepository.findByBaker(bakerId);
};

const orderRepository = require('../../infrastructure/repositories/orderRepository');
const { resolveOrderBaker } = require('../services/resolveOrderBaker');

exports.assignUnassignedOrders = async (userId) => {
  const orders = await orderRepository.findUnassigned(userId);

  for (const order of orders) {
    const bakerId = await resolveOrderBaker(order.cake, { allowProductFallback: true });
    await orderRepository.assignBakerIfUnassigned(order._id, bakerId);
  }
};

const orderRepository = require('../../infrastructure/repositories/orderRepository');

const VALID_STATUSES = ['pending', 'confirmed', 'baking', 'out-for-delivery', 'delivered', 'cancelled'];

exports.updateOrderStatus = async (orderId, status) => {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid status value.');
  }

  const order = await orderRepository.updateStatus(orderId, status);
  if (!order) {
    throw new Error('Order not found.');
  }

  return order;
};
const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.cancelOrder = async ({ orderId, userId }) => {
  const order = await orderRepository.findById(orderId);
  if (!order || order.user.toString() !== userId) {
    throw new Error('Order not found.');
  }

  if (order.status !== 'pending') {
    throw new Error('Only pending orders can be cancelled.');
  }

  const cancelledOrder = await orderRepository.cancelByCustomer(orderId, userId);
  if (!cancelledOrder) {
    throw new Error('This order can no longer be cancelled.');
  }

  return cancelledOrder;
};

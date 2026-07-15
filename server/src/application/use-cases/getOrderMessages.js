const messageRepository = require('../../infrastructure/repositories/messageRepository');
const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.getOrderMessages = async ({ orderId, userId, role }) => {
  const order = await orderRepository.findById(orderId);
  if (!order) {
    throw new Error('Order not found.');
  }

  if (role === 'customer' && order.user.toString() !== userId) {
    throw new Error('You can only view messages for your own orders.');
  }

  return messageRepository.findByOrder(orderId);
};
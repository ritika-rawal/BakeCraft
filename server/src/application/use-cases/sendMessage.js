const messageRepository = require('../../infrastructure/repositories/messageRepository');
const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.sendMessage = async ({ orderId, senderId, senderRole, text }) => {
  if (!text || !text.trim()) {
    throw new Error('Message cannot be empty.');
  }

  const order = await orderRepository.findById(orderId);
  if (!order) {
    throw new Error('Order not found.');
  }

  // Customers can only message about their own order
  if (senderRole === 'customer' && order.user.toString() !== senderId) {
    throw new Error('You can only message about your own orders.');
  }

  if (senderRole === 'baker' && order.baker?.toString() !== senderId) {
    throw new Error('This order is assigned to another baker.');
  }

  const message = await messageRepository.create({
    order: orderId,
    sender: senderId,
    senderRole,
    text: text.trim(),
  });

  return message;
};

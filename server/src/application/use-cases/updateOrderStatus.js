const orderRepository = require('../../infrastructure/repositories/orderRepository');

const VALID_STATUSES = ['pending', 'confirmed', 'baking', 'out-for-delivery', 'delivered', 'cancelled'];
const STATUS_TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['baking', 'cancelled'],
  baking: ['out-for-delivery', 'cancelled'],
  'out-for-delivery': ['delivered'],
  delivered: [],
  cancelled: [],
};

exports.updateOrderStatus = async (orderId, status, bakerId) => {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error('Invalid status value.');
  }

  const existingOrder = await orderRepository.findById(orderId);
  if (!existingOrder || existingOrder.baker?.toString() !== String(bakerId)) {
    throw new Error('Order not found or it is assigned to another baker.');
  }

  if (existingOrder.status === status) return existingOrder;
  if (!STATUS_TRANSITIONS[existingOrder.status]?.includes(status)) {
    throw new Error(`Order cannot move from ${existingOrder.status} to ${status}.`);
  }

  return orderRepository.updateStatus(orderId, bakerId, status);
};

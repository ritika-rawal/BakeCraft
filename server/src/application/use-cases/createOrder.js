const orderRepository = require('../../infrastructure/repositories/orderRepository');

exports.createOrder = async ({ userId, cake, delivery, payment, pricing }) => {
  if (!cake || !delivery || !payment || !pricing) {
    throw new Error('Missing order information.');
  }

  const order = await orderRepository.create({
    user: userId,
    cake,
    delivery,
    payment,
    pricing,
  });

  return order;
};
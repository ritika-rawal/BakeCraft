const orderRepository = require('../../infrastructure/repositories/orderRepository');
const { resolveOrderBaker } = require('../services/resolveOrderBaker');

exports.createOrder = async ({ userId, cake, delivery, payment, pricing }) => {
  if (!cake || !delivery || !payment || !pricing) {
    throw new Error('Missing order information.');
  }

  const bakerId = await resolveOrderBaker(cake);

  const order = await orderRepository.create({
    user: userId,
    baker: bakerId,
    cake,
    delivery,
    payment,
    pricing,
  });

  return order;
};

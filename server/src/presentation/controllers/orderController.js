const { createOrder } = require('../../application/use-cases/createOrder');
const { getMyOrders } = require('../../application/use-cases/getMyOrders');

exports.placeOrder = async (req, res) => {
  try {
    const { cake, delivery, payment, pricing } = req.body;
    const order = await createOrder({
      userId: req.user.userId,
      cake,
      delivery,
      payment,
      pricing,
    });
    res.status(201).json({ message: 'Order placed successfully.', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.myOrders = async (req, res) => {
  try {
    const orders = await getMyOrders(req.user.userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
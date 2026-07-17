const { createOrder } = require('../../application/use-cases/createOrder');
const { getMyOrders } = require('../../application/use-cases/getMyOrders');
const { getAllOrders } = require('../../application/use-cases/getAllOrders');
const { updateOrderStatus } = require('../../application/use-cases/updateOrderStatus');

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

exports.allOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await updateOrderStatus(req.params.id, status);
    res.status(200).json({ message: 'Order status updated.', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
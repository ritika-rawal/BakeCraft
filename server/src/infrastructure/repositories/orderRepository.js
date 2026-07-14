const OrderModel = require('../database/orderSchema');

exports.create = (orderData) => OrderModel.create(orderData);
exports.findByUser = (userId) => OrderModel.find({ user: userId }).sort({ createdAt: -1 });
exports.findById = (orderId) => OrderModel.findById(orderId);
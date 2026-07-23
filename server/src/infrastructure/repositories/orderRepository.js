const OrderModel = require('../database/orderSchema');

exports.create = (orderData) => OrderModel.create(orderData);
exports.findByUser = (userId) =>
  OrderModel.find({ user: userId }).populate('baker', 'name').sort({ createdAt: -1 });
exports.findById = (orderId) => OrderModel.findById(orderId);
exports.findUnassigned = (userId) =>
  OrderModel.find({
    baker: { $exists: false },
    ...(userId ? { user: userId } : {}),
  }).sort({ createdAt: 1 });
exports.assignBakerIfUnassigned = (orderId, bakerId) =>
  OrderModel.findOneAndUpdate(
    { _id: orderId, baker: { $exists: false } },
    { baker: bakerId },
    { returnDocument: 'after' }
  );
exports.findAll = () => OrderModel.find().populate('user', 'name email').sort({ createdAt: -1 });
exports.findByBaker = (bakerId) =>
  OrderModel.find({ baker: bakerId }).populate('user', 'name email').sort({ createdAt: -1 });
exports.updateStatus = (orderId, bakerId, status) =>
  OrderModel.findOneAndUpdate({ _id: orderId, baker: bakerId }, { status }, { new: true });

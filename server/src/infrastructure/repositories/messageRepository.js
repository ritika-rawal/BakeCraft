const MessageModel = require('../database/messageSchema');

exports.create = (data) => MessageModel.create(data);
exports.findByOrder = (orderId) =>
  MessageModel.find({ order: orderId }).sort({ createdAt: 1 }).populate('sender', 'name role');
const { sendMessage } = require('../../application/use-cases/sendMessage');
const { getOrderMessages } = require('../../application/use-cases/getOrderMessages');

exports.postMessage = async (req, res) => {
  try {
    const { orderId, text } = req.body;
    const message = await sendMessage({
      orderId,
      senderId: req.user.userId,
      senderRole: req.user.role,
      text,
    });
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await getOrderMessages({
      orderId: req.params.orderId,
      userId: req.user.userId,
      role: req.user.role,
    });
    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
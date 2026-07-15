const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { postMessage, getMessages } = require('../controllers/messageController');

router.post('/', authMiddleware, postMessage);
router.get('/:orderId', authMiddleware, getMessages);

module.exports = router;
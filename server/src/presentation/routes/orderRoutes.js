const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/requireRole');
const { placeOrder, myOrders, allOrders, changeOrderStatus } = require('../controllers/orderController');

router.post('/', authMiddleware, placeOrder);
router.get('/my-orders', authMiddleware, myOrders);
router.get('/all', authMiddleware, requireRole('baker'), allOrders);
router.patch('/:id/status', authMiddleware, requireRole('baker'), changeOrderStatus);

module.exports = router;
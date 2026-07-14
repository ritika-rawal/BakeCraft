const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { placeOrder, myOrders } = require('../controllers/orderController');

router.post('/', authMiddleware, placeOrder);
router.get('/my-orders', authMiddleware, myOrders);

module.exports = router;
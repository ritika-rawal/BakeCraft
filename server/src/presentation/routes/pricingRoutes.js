const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/requireRole');
const { fetchPricing, savePricing } = require('../controllers/pricingController');

router.get('/', fetchPricing); // public — customers need this to build cakes
router.put('/', authMiddleware, requireRole('baker'), savePricing);

module.exports = router;
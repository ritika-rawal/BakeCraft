const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const requireRole = require('../middlewares/requireRole');
const {
  publicProducts,
  myProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', publicProducts);
router.get('/mine', authMiddleware, requireRole('baker'), myProducts);
router.post('/', authMiddleware, requireRole('baker'), createProduct);
router.put('/:id', authMiddleware, requireRole('baker'), updateProduct);
router.delete('/:id', authMiddleware, requireRole('baker'), deleteProduct);

module.exports = router;

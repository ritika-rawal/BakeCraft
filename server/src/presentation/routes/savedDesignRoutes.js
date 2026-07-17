const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { create, list, remove } = require('../controllers/savedDesignController');

router.post('/', authMiddleware, create);
router.get('/', authMiddleware, list);
router.delete('/:id', authMiddleware, remove);

module.exports = router;
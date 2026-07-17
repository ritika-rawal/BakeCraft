const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, login, profile, updateMe, updatePassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authMiddleware, profile);
router.put('/me', authMiddleware, updateMe);
router.put('/change-password', authMiddleware, updatePassword);

module.exports = router;
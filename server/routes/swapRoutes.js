const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, swapController.createSwap);
router.get('/my', authMiddleware, swapController.getMySwaps);
router.get('/item/:itemId', authMiddleware, swapController.getItemSwaps);
router.patch('/:id', authMiddleware, swapController.updateSwapStatus);

module.exports = router; 
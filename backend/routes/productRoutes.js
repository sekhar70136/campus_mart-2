const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, getMyAds, updateProductStatus } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, createProduct);
router.route('/myads').get(protect, getMyAds);
router.route('/:id').get(getProductById).put(protect, updateProductStatus);

module.exports = router;
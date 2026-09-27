const Product = require('../models/Product');
const User = require('../models/User');

// @desc Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            where: { status: 'Available' },
            include: [{ model: User, as: 'seller', attributes: ['name', 'campus'] }]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: User, as: 'seller', attributes: ['name', 'campus'] }]
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Create a product (Sell)
const createProduct = async (req, res) => {
    const { title, description, price, category, condition, imageUrl, mobile } = req.body;
    try {
        if (!/^\d{10}$/.test(mobile || '')) return res.status(400).json({ message: 'Enter a valid 10-digit mobile number' });
        if (imageUrl && !imageUrl.startsWith('data:image/')) {
            return res.status(400).json({ message: 'Image must be a valid image file' });
        }

        const product = await Product.create({
            title, description, price, category, condition, imageUrl: imageUrl || 'no-image.jpg', contactMobile: mobile, sellerId: req.user.id
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get user's own ads
const getMyAds = async (req, res) => {
    try {
        const products = await Product.findAll({ where: { sellerId: req.user.id } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProductStatus = async (req, res) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id, sellerId: req.user.id } });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.status = req.body.status === 'Sold' ? 'Sold' : 'Available';
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProducts, getProductById, createProduct, getMyAds, updateProductStatus };
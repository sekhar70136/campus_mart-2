const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc Create an order (Buy Now)
const createOrder = async (req, res) => {
    const { productId } = req.body;
    try {
        const product = await Product.findByPk(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.status === 'Sold') return res.status(400).json({ message: 'Already sold' });

        const platformFee = product.price * 0.05; // 5% platform fee
        const totalAmount = parseFloat(product.price) + parseFloat(platformFee);

        const order = await Order.create({
            totalAmount,
            platformFee,
            productId: product.id,
            buyerId: req.user.id
        });

        // Mark product as sold
        product.status = 'Sold';
        await product.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder };
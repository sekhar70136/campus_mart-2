const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    platformFee: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'Pending' } // Pending, Completed, Cancelled
});

// Relationships
User.hasMany(Order, { foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'buyer', foreignKey: 'buyerId' });
Product.hasOne(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false }, // e.g., Drafters, Calculators
    condition: { type: DataTypes.STRING, allowNull: false }, // New, Used
    imageUrl: { type: DataTypes.TEXT('medium'), allowNull: false },
    contactMobile: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
    status: { type: DataTypes.STRING, defaultValue: 'Available' }, // Available, Sold
    sellerId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } }
});

// Relationships
User.hasMany(Product, { foreignKey: 'sellerId' });
Product.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });

module.exports = Product;
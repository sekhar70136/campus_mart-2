const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    text: { type: DataTypes.TEXT, allowNull: false },
    senderId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    receiverId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    productId: { type: DataTypes.INTEGER, allowNull: true } // Optional: chat about a specific product
});

module.exports = Message;
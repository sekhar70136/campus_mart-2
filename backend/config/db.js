const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Database Connected Successfully.');
        // Sync models (creates tables if they don't exist)
        await sequelize.sync({ alter: true }); 
        console.log('✅ Database Tables Synced.');
    } catch (error) {
        console.error('❌ Unable to connect to MySQL:', error);
    }
};

module.exports = { sequelize, connectDB };
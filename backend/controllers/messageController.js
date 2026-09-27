const { Op } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');

const getMessages = async (req, res) => {
    const receiverId = Number(req.params.userId);
    if (!receiverId) return res.status(400).json({ message: 'A valid user is required' });

    try {
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: req.user.id, receiverId },
                    { senderId: receiverId, receiverId: req.user.id }
                ]
            },
            order: [['createdAt', 'ASC']]
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const sendMessage = async (req, res) => {
    const { receiverId, text } = req.body;
    if (!receiverId || !text?.trim()) {
        return res.status(400).json({ message: 'Receiver and message are required' });
    }

    try {
        const receiver = await User.findByPk(receiverId);
        if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

        const message = await Message.create({
            senderId: req.user.id,
            receiverId,
            text: text.trim()
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getMessages, sendMessage };
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const isCollegeEmail = (email) => email?.toLowerCase().endsWith('.edu.in');

// @desc Register new user
const registerUser = async (req, res) => {
    const { name, email, password, campus, college } = req.body;
    try {
        if (!isCollegeEmail(email)) return res.status(400).json({ message: 'Please use your college email ending in .edu.in' });
        if (!college) return res.status(400).json({ message: 'Please select your college' });
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, campus: college, college });
        res.status(201).json({ id: user.id, name: user.name, email: user.email, college: user.college, token: generateToken(user.id) });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Auth user & get token
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!isCollegeEmail(email)) return res.status(400).json({ message: 'Please use your college email ending in .edu.in' });
        const user = await User.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({ id: user.id, name: user.name, email: user.email, college: user.college || user.campus, token: generateToken(user.id) });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
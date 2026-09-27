const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const { connectDB } = require('./config/db');
const Message = require('./models/Message');
const User = require('./models/User');

dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MySQL
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const messageRoutes = require('./routes/messageRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/messages', messageRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Campus Mart API is running...');
});

io.on('connection', (socket) => {
    const userId = Number(socket.handshake.auth.userId);
    if (!userId) return socket.disconnect();

    socket.join(`user:${userId}`);

    socket.on('send-message', async ({ receiverId, text }) => {
        if (!receiverId || !text?.trim()) return;

        const receiver = await User.findByPk(receiverId);
        if (!receiver) return;

        const message = await Message.create({
            senderId: userId,
            receiverId,
            text: text.trim()
        });

        io.to(`user:${userId}`).to(`user:${receiverId}`).emit('new-message', message);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
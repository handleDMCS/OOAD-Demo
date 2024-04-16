import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import itemRoutes from './routes/item.route.js';
import listingRoutes from './routes/listing.route.js';
import roomRoutes from './routes/room.route.js';
import cookieParser from 'cookie-parser';

import { createServer } from 'node:http';
import { Server } from 'socket.io';

// import socketio from './socket.js';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB connected');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Socket.io
const server = createServer(app);
const io = new Server(server);
const socket = io;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);   
app.use('/api/listing', listingRoutes);
app.use('/api/room', roomRoutes);


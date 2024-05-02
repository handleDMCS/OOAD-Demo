import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import itemRoutes from './routes/item.route.js';
import listingRoutes from './routes/listing.route.js';
import roomRoutes from './routes/room.route.js';
import cookieParser from 'cookie-parser';

import { app, server } from './socket.js';

// import socketio from './socket.js';

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB connected');
});

// Socket.io


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);   
app.use('/api/listing', listingRoutes);
app.use('/api/room', roomRoutes);
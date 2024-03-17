import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import itemRoutes from './routes/item.route.js';
import listingRoutes from './routes/listing.route.js';
import roomRoutes from './routes/room.route.js';

const app = express();

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB connected');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);   
app.use('/api/listing', listingRoutes);
app.use('/api/room', roomRoutes);


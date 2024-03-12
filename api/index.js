import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB connected');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
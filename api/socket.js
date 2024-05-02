import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'localhost:5173',
        methods: ['*'],
        allowedHeaders: ['*'],
    }
});

const listingIo = new Server(server, {
    path: '/socket/listing',
    cors: {
        origin: 'localhost:5173',
        methods: ['*'],
        allowedHeaders: ['*'],
    }
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', (reason) => {
        console.log('User disconnected');
    });
});

listingIo.on('connection', (socket) => {
    console.log('User connecxted to listing');

    // join listing
    socket.on('join', ({ listing }) => {
        socket.join(listing.toString());
        console.log('User joined listing');
    });
    socket.on('leave', ({ listing }) => {
        socket.leave(listing.toString());
        console.log('User left listing');   
    });
    
    // disconnect from listing
    socket.on('disconnect', (reason) => {
        console.log('User disconnected from listing');
    });
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Path: api/socket.js
// Compare this snippet from api/routes/listing.route.js:

export { io, listingIo, app, server }
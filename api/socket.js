import { Server } from 'socket.io';

// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

let io;

export const init = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_BASE_URL,
            methods: ['*'],
            allowedHeaders: ['*'],
          },
    });
}

export const initListing = (httpServer, path = 'socket/listingPage') => {
    listingIo = new Server(httpServer, {cors: {
        origin: process.env.CLIENT_BASE_URL,
        methods: ['*'],
        allowedHeaders: ['*'],
      },
      path: path,
    });
    return listingIo;
}

export const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}

// exports.getListingIO = () => {
//     if (!listingIo) {
//         throw new Error('Listing socket.io not initialized');
//     }
//     return listingIo;
// }

export default io;
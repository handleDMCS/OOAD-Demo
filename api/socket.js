import { Server } from 'socket.io';

const socketio = new Server({
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

export const init = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
        },
    });
    return io;
}

export const initListing = (server, path = '/socket/listingPage') => {
    const listingIo = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['*'],
        },
        path: path,
    });
    return listingIo;
}

export const getIO = () => {
    if (!socketio) {
        throw new Error('Socket.io not initialized');
    }
    return socketio;
}



// export const initListing = (httpServer, path = 'socket/listingPage') => {
//     listingIo = new Server(httpServer, {cors: {
//         origin: process.env.CLIENT_BASE_URL,
//         methods: ['*'],
//         allowedHeaders: ['*'],
//       },
//       path: path,
//     });
//     return listingIo;
// }

// export const getIO = () => {
//     if (!io) {
//         throw new Error('Socket.io not initialized');
//     }
//     return io;
// }

// exports.getListingIO = () => {
//     if (!listingIo) {
//         throw new Error('Listing socket.io not initialized');
//     }
//     return listingIo;
// }

export default socketio;
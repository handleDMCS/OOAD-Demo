
const socketio = new Server({
    cors: {
        origin: process.env.CLIENT_BASE_URL,
        methods: ['GET', 'POST']
    }
});

// export const init = (httpServer) => {
//     io = new Server(httpServer, {
//         cors: {
//             origin: process.env.CLIENT_BASE_URL,
//             methods: ['*'],
//             allowedHeaders: ['*'],
//           },
//     });
// }

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
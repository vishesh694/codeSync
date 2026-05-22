const express = require('express');

const http = require('http');

const { Server } = require('socket.io');

const { default: ACTIONS } = require('./src/Actions');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {

    return Array.from(
        io.sockets.adapter.rooms.get(roomId) || []
    ).map((socketId) => {

        return {
            socketId,
            userName: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket) => {

    console.log('socket connected', socket.id);

    socket.on(
        ACTIONS.JOIN,
        ({ roomId, userName }) => {

            userSocketMap[socket.id] = userName;

            socket.join(roomId);

            const clients =
                getAllConnectedClients(roomId);

            clients.forEach(({ socketId }) => {

                io.to(socketId).emit(
                    ACTIONS.JOINED,
                    {
                        clients,
                        userName,
                        socketId: socket.id,
                    }
                );
            });
        }
    );

    socket.on(ACTIONS.CODE_CHANGE, ({roomId, code}) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, {code});
    })
    socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, {code});
    })

    socket.on('disconnecting', () => {

        const rooms = [...socket.rooms];

        rooms.forEach((roomId) => {

            socket.in(roomId).emit(
                ACTIONS.DISCONNECTED,
                {
                    socketId: socket.id,
                    userName:
                        userSocketMap[socket.id],
                }
            );
        });

        delete userSocketMap[socket.id];

        socket.leave();
    });
});

const PORT = process.env.PORT || 8001;

server.listen(PORT, () =>
    console.log(
        `Server is listening at PORT: ${PORT}`
    )
);
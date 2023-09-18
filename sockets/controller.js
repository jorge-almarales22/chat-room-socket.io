import { createMessage } from "../helpers/create-message.js";
import User from "../models/user.js";

const user = new User();

export const socketController = (socket) => {

    // console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        // console.log('user disconnected');

        const usr = user.getUserById(socket.id);

        user.removeUser(socket.id);

        socket.broadcast.to(usr.room).emit('user-disconnected', { id: socket.id, name: usr.username });

        const users = user.getUserByRoom(usr.room);

        socket.broadcast.to(usr.room).emit('list-users', users);

    })


    socket.on('into-chat', (payload, callback) => {
        if(!payload.name || !payload.room) {
            callback({ message: 'The name and the room is required', error: true });
        }

        user.addUser(socket.id, payload.name, payload.room);

        socket.join(payload.room);

        const usersByRoom = user.getUserByRoom(payload.room);

        callback(usersByRoom);

        socket.broadcast.to(payload.room).emit('list-users', usersByRoom);
    });

    socket.on('new-group-message', (payload) => {
        socket.broadcast.to(payload.room).emit('new-group-message', createMessage(payload.name, payload.message));
    })

    socket.on('private-message', (payload) => {
        socket.broadcast.to(payload.to).emit('private-message', createMessage(payload.name, payload.message));
    })

}
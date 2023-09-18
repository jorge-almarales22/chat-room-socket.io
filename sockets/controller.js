import { createMessage } from "../helpers/create-message.js";
import User from "../models/user.js";

const user = new User();

export const socketController = (socket) => {

    // console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');

        const name = user.getUserById(socket.id).username;
        user.removeUser(socket.id);

        socket.broadcast.emit('user-disconnected', { id: socket.id, name });

        const users = user.getUsers();
        socket.broadcast.emit('list-users', users);

    })


    socket.on('into-chat', (payload, callback) => {
        if(!payload.name) {
            callback({ error: 'The name is required', error: true });
        }

        const users = user.addUser(socket.id, payload.name);

        callback(users);

        socket.broadcast.emit('list-users', users);
    });

    socket.on('new-message', (payload) => {
        socket.broadcast.emit('new-message', createMessage(payload.name, payload.message));
    })

    socket.on('private-message', (payload) => {
        socket.broadcast.to(payload.to).emit('private-message', createMessage(payload.name, payload.message));
    })

}
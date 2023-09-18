export const socketController = (socket) => {

    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    // socket.on('send-message', (payload, callback) => {
    //     const id = new Date().getTime();
    //     callback({ id, ...payload });

    //     socket.broadcast.emit('send-message', payload)
    // })

}
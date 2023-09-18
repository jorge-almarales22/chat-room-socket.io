const socket = io();

socket.on('connect', () => {
    console.log('a user connected');
    document.getElementById('estadoConectado').classList.remove('d-none');
    document.getElementById('estadoDesconectado').classList.add('d-none');
})

socket.on('disconnect', () => {
    console.log('user disconnected');
    document.getElementById('estadoConectado').classList.add('d-none');
    document.getElementById('estadoDesconectado').classList.remove('d-none');
})


// socket.on('send-message', (payload) => {
//     console.log(payload);
// })


// document.getElementById('form').addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = document.getElementById('message').value;
//     const data = {
//         message
//     }
//     socket.emit('send-message', data, (payload) => {
//         console.log("desde el sever", payload);
//     });
//     message.value = '';
// });
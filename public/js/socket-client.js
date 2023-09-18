const socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('room')){

    window.location = 'index.html';

    throw new Error('The name and the room are required');
}

const user = {name: params.get('name'), room: params.get('room')};

socket.on('connect', () => {
    // console.log('a user connected');
    // document.getElementById('estadoConectado').classList.remove('d-none');
    // document.getElementById('estadoDesconectado').classList.add('d-none');

    socket.emit('into-chat', user, (data) => {
        console.log('en el chat: ', data);
    });

    // socket.emit('into-chat', user);
})

socket.on('disconnect', () => {
    // console.log('user disconnected');
    // document.getElementById('estadoConectado').classList.add('d-none');
    // document.getElementById('estadoDesconectado').classList.remove('d-none');
})

socket.on('user-disconnected', (data) => {
    console.log('usuario desconectado', data);
})

socket.on('list-users', (users) => {
    console.log(users);
})

socket.on('new-group-message', (payload) => {
    console.log(payload);
})


//Message private
socket.on('private-message', (payload) => {
    console.log(payload);
})
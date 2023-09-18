import express from 'express';
import "dotenv/config";
import { createServer } from 'node:http';
import { Server as ServerIO } from 'socket.io';
import { socketController } from '../sockets/controller.js';

export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.middleware();
        this.routes();
        this.server = createServer(this.app);
        this.io =  new ServerIO(this.server);
        this.path = {
            auth: '/api/auth'
        }
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.path.auth);
    }

    socket() {

        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
export default class User {
    constructor() {
        this.users = [];
    }

    addUser(id, username) {
        this.users.push({
            id,
            username    
        })

        return this.users;
    }
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }

    removeUser(id) {

        const user = this.getUserById(id);

        this.users = this.users.filter(user => user.id !== id);

        return user;
    }

    getUsers() {
        return this.users;
    }

    getUserByRoom(room) {
        return this.users.filter(user => user.room === room);
    }
}
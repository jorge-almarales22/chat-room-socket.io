export const createMessage = (name, message) => {
    return {
        name,
        message,
        createdAt: new Date().getTime()
    }
}
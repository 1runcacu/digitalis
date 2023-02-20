const namespace = "admin";
const server = require("../index")(namespace);

const onConnection = (socket) => {
    
}

server.on("connection", onConnection);

module.exports = server;
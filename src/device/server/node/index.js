const namespace = "node";
const server = require("../index")(namespace);
const route = require("./route");
const {tools:{install}} = require("../../../utils");

const onConnection = (socket) => {
    install([route],server,socket);
}

server.on("connection", onConnection);

module.exports = server;
const namespace = "net";
const server = require("../index")(namespace);
const {refs} = require("../hooks");
const {tools:{install}} = require("../../../utils");
const net = require("./net");

const onConnection = (socket) => {
    install(refs,server,socket);
    install([net],server,socket);
}

server.on("connection", onConnection);

module.exports = server;
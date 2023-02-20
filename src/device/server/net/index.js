const namespace = "net";
const server = require("../index")(namespace);
const {refs} = require("../hooks");
const {tools:{install}} = require("../../../utils");

const onConnection = (socket) => {
    install(refs,server,socket);
}

server.on("connection", onConnection);

module.exports = server;
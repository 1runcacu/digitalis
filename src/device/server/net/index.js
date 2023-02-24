const namespace = "net";
const server = require("../index")(namespace);
const {refs} = require("../hooks");
const {tools:{install,wait}} = require("../../../utils");
const net = require("./net");
const {WebApiType,WebApi,FIELD} = require("../../../api");

server.use(async (socket, next) => {
    next();
    await wait(100);
    WebApi.serviceSearch(FIELD.ALL);
});

const onConnection = (socket) => {
    install(refs,server,socket);
    install([net],server,socket);
}

server.on("connection", onConnection);

module.exports = server;
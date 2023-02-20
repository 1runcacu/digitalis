const {port} = require("../../config");
const {global} = require("./hooks");
const {tools:{install}} = require("../../utils");
const server = require("socket.io")(port);

module.exports = (nsp="/")=>{
    const io = server.of(nsp);
    install(global,io);
    return io;
};
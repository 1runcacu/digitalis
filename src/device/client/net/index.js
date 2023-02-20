const namespace = "net";
const client = require("../index");
const net = require("./net");
const {tools:{install}} = require("../../../utils");

module.exports = client(namespace,(io,socket)=>{
    install([net],client,socket);
    
    // socket.emit("client",1,2,3);
});
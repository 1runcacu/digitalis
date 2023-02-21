const namespace = "net";
const client = require("../index");
const net = require("./net");
const {tools:{install,id}} = require("../../../utils");

module.exports = client(namespace,(io,socket)=>{
    install([net],client,socket);
    // setTimeout(() => {
    //     socket.emit("client",{sid:id()});
    // }, 2000);
});
const namespace = "node";
const client = require("../index");
const route = require("./route");
const {tools:{install,id}} = require("../../../utils");

module.exports = client(namespace,(io,socket)=>{
    install([route],client,socket);
    // setTimeout(() => {
    //     socket.emit("client",{sid:id()});
    // }, 2000);
});
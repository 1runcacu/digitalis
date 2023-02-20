const namespace = "net";
const client = require("../index");
const net = require("./net");
const {WebApi} = require("../../../api");
const {tools:{install}} = require("../../../utils");


module.exports = client(namespace,(io,socket)=>{
    install([net],client,socket);
    WebApi.serviceSearch();
    // socket.emit("client",1,2,3);
});
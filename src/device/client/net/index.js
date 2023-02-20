const namespace = "net";
const client = require("../index");
// const {refs} = require("../hooks");
// const {tools:{install}} = require("../../../utils");


module.exports = client(namespace,(io,socket)=>{
    // install(refs,io,socket);
    socket.emit("client",1,2,3);
});
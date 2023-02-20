const client = require("socket.io-client");
const {refs} = require("./hooks");
const {tools:{install}} = require("../../utils");
const {device_id,link} = require("../../config");
// const socket = client("ws://127.0.0.1:8000");
// const {EventEmitter} = require('events');

// const emitter = new EventEmitter();

// // 监听服务器发来的消息
// socket.on('message', function(data) {
//     console.log('收到服务器消息：', data);
// });
  
//   // 向服务器发送消息
// socket.emit('message', '你好，服务器！');

module.exports = (namespace="",ref=(client,socket)=>{})=>{
    if(link){
        const socket = client(`${link}/${namespace}`,{
            auth:{
                device_id
            }
        });
        socket.connect();
        ref&&ref(client,socket);
        install(refs,null,socket);
        return socket;
    }
    return {};
}

/**
 * field?作用域
 * priority?优先级
 * install?安装方法
 * router?[
 *   path?{
 *      protocol?协议,
 *      handle?路由回调(res,req)=>void
 *   }
 * ]
 */
// const map = require("../../db/mapDB");
// const {WebApiType,WebApi,FIELD} = require("../../../api");
// const emitter = require("../../emitter");
// const {device_id} = require("../../../config");

module.exports = (io,socket)=>{
    return {
        install:()=>{
            socket.onAny((eventName, pack) => {
                // console.log('onAny',eventName);
            });
            socket.onAnyOutgoing((eventName, pack) => {
                // const {sid,origin} = pack;
                // map.set(sid,pack);
                // console.log('c send',eventName,origin,sid);
            });
            socket.prependAny((eventName, pack) => {
                console.log(eventName);
            });
            socket.prependAnyOutgoing((eventName, pack) => {
                console.log(`prependAnyOutgoing ${eventName}`);
            });
        },
        router:[
            {
                path:"connect",
                handle:(res,req)=>{
                    console.log('连接成功');
                }
            },
            {
                path:"reconnect",
                handle:(res,req)=>{
                    console.log('重新连接');
                }
            }
        ]
    }
}
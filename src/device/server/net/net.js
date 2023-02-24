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

const map = require("../../db/mapDB");
const {WebApiType,WebApi,FIELD} = require("../../../api");
const emitter = require("../../emitter");
const {device_id} = require("../../../config");

module.exports = (io,socket)=>{
    return {
        install:()=>{
            emitter.on(WebApiType.BROADCAST,(eventName,pack)=>{
                io.emit(eventName,pack);
            })
            socket.onAny((eventName, pack) => {
                // console.log('onAny',eventName);
            });
            socket.onAnyOutgoing((eventName, pack) => {
                // const {sid,origin} = pack;
                // map.set(sid,pack);
                // console.log('s send',eventName,origin,sid);
            });
            socket.prependAny((eventName, pack) => {
                const {sid,rid,event,origin,field,targets} = pack;
                if(!map.has(sid)){
                    WebApi.systemBroadcast(eventName,pack);
                    emitter.emit(eventName,pack);
                }
            });
            socket.prependAnyOutgoing((eventName, pack) => {
                
            });
        },
        router:[
            {
                path:"connect",
                handle:(res,req)=>{
                    // console.log('连接成功');
                    WebApi.serviceSearch();
                }
            },
            {
                path:"reconnect",
                handle:(res,req)=>{
                    // console.log('重新连接');
                    WebApi.serviceSearch();
                }
            }
        ]
    }
}
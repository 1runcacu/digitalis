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
const {WebApiType,WebApi} = require("../../../api");
const emitter = require("../../emitter");
const { validate } = require('uuid');

module.exports = (io,socket)=>{
    return {
        install:()=>{
            emitter.on(WebApiType.BROADCAST,(eventName,pack)=>{
                socket.emit(eventName,pack);
            })
            socket.onAny((eventName, pack) => {
                // console.log('onAny',eventName);
            });
            socket.onAnyOutgoing((eventName, pack) => {
                const {sid,origin} = pack;
                map.set(sid,pack);
                // console.log('c send',eventName,origin,sid);
            });
            socket.prependAny((eventName, pack) => {
                const {sid,rid,event,origin} = pack;
                if(!map.has(sid)){
                    emitter.emit(WebApiType.BROADCAST,eventName,pack);
                    switch(event){
                        case WebApiType.SYNC:
                            WebApi.systemAck(pack);
                            WebApi.serviceSearch();
                            break;
                        case WebApiType.ACK:
                            rid&&emitter.emit(rid,pack);
                            break;
                    }
                }
            });
            socket.prependAnyOutgoing((eventName, pack) => {
                // console.log(`prependAnyOutgoing ${eventName}`);
            });
        }
    }
}
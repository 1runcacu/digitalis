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
const { validate } = require('uuid');
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
                const {sid,origin} = pack;
                map.set(sid,pack);
                // console.log('s send',eventName,origin,sid);
            });
            socket.prependAny((eventName, pack) => {
                const {sid,rid,event,origin,field,targets} = pack;
                if(!map.has(sid)){
                    WebApi.systemBroadcast(eventName,pack);
                    switch(event){
                        case WebApiType.SYNC:
                            WebApi.systemAck(pack);
                            if(field===FIELD.ALL)
                                {WebApi.serviceSearch();console.log(field);}
                            break;
                        case WebApiType.ACK:
                            rid&&emitter.emit(rid,pack);
                        case WebApiType.P2P:
                            if(targets&&targets.includes(device_id)){
                                console.log(`收到${origin}的消息`);
                            }
                            break;
                    }
                }
            });
            socket.prependAnyOutgoing((eventName, pack) => {
                
            });
        }
    }
}
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

module.exports = (io,socket)=>{
    return {
        install:()=>{
            socket.onAny((eventName, pack) => {
                // console.log('onAny',eventName);
            });
            socket.onAnyOutgoing((eventName, pack) => {
                const {sid,origin} = pack;
                map.set(sid,pack);
                // console.log('c send',eventName,origin,sid);
            });
            socket.prependAny((eventName, pack) => {
                const {sid,event,origin} = pack;
                if(event&&origin&&sid&&!map.has(sid)){
                    switch(event){
                        case WebApiType.SYNC:
                            WebApi.systemSync(pack);
                            WebApi.systemAck();
                            break;
                        case WebApiType.ACK:
                            WebApi.systemAck(pack);
                            console.log('c recive',eventName,origin);
                            break;
                    }
                    map.set(sid,pack);
                    // console.log('c recive',eventName,origin);
                }else{
                    // console.log("数据包无效");
                }
            });
            socket.prependAnyOutgoing((eventName, pack) => {
                // console.log(`prependAnyOutgoing ${eventName}`);
            });
        }
    }
}
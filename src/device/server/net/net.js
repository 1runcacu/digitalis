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

const emitter = require("../../emitter");
const {device_id} = require("../../../config");
const {tools:{id}} = require("../../../utils");
const {WebApiType} = require("../../../api");

module.exports = (io,socket)=>{
    return {
        install:()=>{
            // emitter.on(WebApiType.SYNC,pack=>{
            //     io.emit(WebApiType.SYNC,pack);
            // });
            // emitter.on(WebApiType.ACK,pack=>{
            //     io.emit(WebApiType.ACK,pack);
            // });
            // emitter.on(WebApiType.P2P,pack=>{
            //     io.emit(WebApiType.P2P,pack);
            // });
        }
    }
}
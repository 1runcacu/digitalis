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
const {WebApiType,WebApi,FIELD} = require("../../api");

module.exports = (io)=>{
    return {
        install:()=>{
            io.on(WebApiType.ACK,pack=>{
                const {sid,rid,event,origin,field,targets} = pack;
                rid&&io.emit(rid,pack);
            })
        }
    }
}
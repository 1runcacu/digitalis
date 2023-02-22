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
const {device_id} = require("../../config");

module.exports = (io)=>{
    return {
        install:()=>{
            io.on(WebApiType.P2P,pack=>{
                const {sid,rid,event,origin,field,targets} = pack;
                if(targets&&targets.includes(device_id)){
                    console.log(`收到${origin}的消息`);
                }
            })
        }
    }
}
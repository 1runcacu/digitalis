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
const {WebApi} = require("../../../api");

module.exports = (io,socket)=>{
    return {
        router:[
            {
                path:"connect",
                handle:(res,req)=>{
                    console.log('连接成功');
                    WebApi.serviceSearch();
                }
            },
            {
                path:"reconnect",
                handle:(res,req)=>{
                    console.log('重新连接');
                    WebApi.serviceSearch();
                }
            }
        ]
    }
}
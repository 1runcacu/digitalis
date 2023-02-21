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
const {tools:{id}} = require("../../../utils");
const {port} = require("../../../config"); 
const {WebApi} = require("../../../api");

module.exports = (io,socket)=>{
    if(port==10004){
        setInterval(()=>{
            // console.log(233);
            socket.emit("ctest",{sid:id()});
        },1000);
    }
    return {
        router:[
            {
                path:"connect_error",
                handle:(...args)=>{
                    console.log("error");
                    // console.log('连接失败',args);
                }
            },
            {
                path:"disconnect",
                handle:(...args)=>{
                    // WebApi.serviceSearch();
                    // console.log('disconnect',args);
                }
            },
            {
                path:"disconnecting",
                handle:(...args)=>{
                    // console.log("断开连接");
                    // console.log('disconnecting',args);
                }
            }
        ]
    }
}
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
module.exports = (io,socket)=>{
    return {
        router:[
            {
                path:"connect_error",
                handle:(...args)=>{
                    // console.log("error");
                    // console.log('连接失败',args);
                }
            },
            {
                path:"disconnect",
                handle:(...args)=>{
                    console.log('disconnect',args);
                }
            },
            {
                path:"disconnecting",
                handle:(...args)=>{
                    // console.log('disconnecting',args);
                }
            }
        ]
    }
}
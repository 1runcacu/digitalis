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

const {WebApi,FIELD} = require("../../../api");
const { wait } = require("../../../utils/tools");

module.exports = (io,socket)=>{
    return {
        priority:-1,
        install:()=>{
            io&&io.use(async (socket, next) => {
                // console.log(socket.request.headers);
                // next(new Error('fail'));
                console.log("服务器认证成功");
                next();
                // await wait(100);
                // WebApi.serviceSearch(FIELD.ALL);
            });
        }
    }
}
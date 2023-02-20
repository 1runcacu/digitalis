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
        install:()=>{
            socket.onAny((eventName, ...args) => {
                console.log('onAny',eventName);
            });
            socket.onAnyOutgoing((eventName, ...args) => {
                console.log(`onAnyOutgoing ${eventName}`);
              });
            socket.prependAny((eventName, ...args) => {
                console.log('prependAny',eventName);
            });
            socket.prependAnyOutgoing((eventName, ...args) => {
                console.log(`prependAnyOutgoing ${eventName}`);
            });
            // socket[Symbol.for('nodejs.rejection')] = (err) => {
            //     // socket.emit("error", err);
            //     // console.log(err);
            // };
        }
    }
}
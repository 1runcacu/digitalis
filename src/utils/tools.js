/**
 * priority?优先级
 * install?安装方法
 * router?[
 *   {
 *      path?
 *      protocol?协议,
 *      handle?路由回调(res,req)=>void
 *   }
 * ]
 */
const resHandle = (option={})=>{
    const copy = {...option};
    Object.assign(copy,{
        get(key){
            copy.headers&&copy.headers[key];
        },
        set(key,value){
            copy.headers&&(copy.headers[key]=value);
        },
    });
    return copy;
}

module.exports = {
    id:()=>Math.random(Date.now()).toString(36).substr(2)+Math.random().toString(36).substr(2),
    install:(handle,io,socket)=>{
        // console.log(io);
        handle.map(item=>item(io,socket))
        .sort(({priority:u=0},{priority:v=0})=>u-v)
        .forEach(({install,router})=>{
            install&&install();
            socket&&router&&router.forEach(({path,protocol,handle})=>{
                path&&socket.on(path,(...args)=>{
                    handle&&handle(resHandle({url:path,protocol,headers:{}}),{body:args});
                });
            })
        });
    }
}
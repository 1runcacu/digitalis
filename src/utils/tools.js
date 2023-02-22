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
const { v4: uuidv4 } = require('uuid');

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
    id:()=>uuidv4(),
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
    },
    // register:(handle,io)=>{
    //     handle.map(item=>item(io))
    //     .sort(({priority:u=0},{priority:v=0})=>u-v)
    //     .forEach(({install,router})=>{
    //         install&&install();
    //         socket&&router&&router.forEach(({path,protocol,handle})=>{
    //             path&&socket.on(path,(...args)=>{
    //                 handle&&handle(resHandle({url:path,protocol,headers:{}}),{body:args});
    //             });
    //         })
    //     });
    // },
    wait:async (time=3000)=>{
        await new Promise(resolve=>{
            setTimeout(() => {
                resolve();
            }, time);
        })
    }
}
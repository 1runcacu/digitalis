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

const emitter = require("../emitter");
const {device_id,port} = require("../../config");
const {tools:{id}} = require("../../utils");
const db = require("../mapDB");
const {dispatch} = require("../configure");
const {SYNC,P2P,ONCALL,ONBACK,sync2peer,peer2peer} = require("./api");


module.exports = (io,socket)=>{
    const send = (type,pack={})=>{
        try{
            const {headers:{session_id}} = pack;
            db.set(session_id,pack);
            if(socket.broadcast){
                io.emit(type,pack);
            }else{
                socket.volatile.emit(SYNC,pack);
                // console.log(socket);
            }
        }catch(err){console.log(err);}
    };
    const handle = (type,pack={})=>{
        // console.log(pack);
        const {headers:{session_id,target}} = pack;
        if(session_id&&!db.has(session_id)){
            db.set(session_id,pack);
            dispatch(pack);
            if(target){
                target!=device_id&&emitter.emit(type,pack);
            }else{
                emitter.emit(type,pack);
            }
        }
    }
    return {
        install:()=>{
            const broadcast = pack=>send(SYNC,pack);
            const p2p = pack=>send(P2P,pack);
            const oncall = pack=>send(ONCALL,pack);
            emitter.on(SYNC,broadcast);
            emitter.on(P2P,p2p);
            emitter.on(ONCALL,oncall);
            socket.on(SYNC,pack=>handle(SYNC,pack));

            // socket.on('request',(sid,...args)=>{
            //     socket.emit('response',sid,args);
            //     // setTimeout(() => {
            //     //     socket.emit('response',sid,args);
            //     // }, 1000);
            // });
            // socket.on('response',(sid,...args)=>{
            //     emitter.emit(sid,...args);
            // });
        }
    }
}
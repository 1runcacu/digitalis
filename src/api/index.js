const emitter = require("../device/emitter");
const {tools:{id,wait}} = require("../utils");
const {device_id} = require("../config");

const nodes = new Proxy({},{
    get(target,key){
        return target[key];
    },
    set(target,key,value){
        target[key]=value;
        return false;
    }
});

const routers = new Proxy({},{
    get(target,key){
        return target[key];
    },
    set(target,key,value){
        target[key]=value;
        return false;
    }
});


function init(){
    nodes[device_id] = {
        confirm_time:Date.now(),
        status:true
    };
    routers[device_id] = {};
}
init();

const WebApiType = {
    SYNC:"sync",
    ACK:"ack",
    P2P:"p2p",
    ONCALL:"oncall",
}

function packMaker(pack = {},event=null){
    const defPack = {
        sid:id(),
        origin:device_id,
        timestamp:Date.now(),
        event,
    }
    return Object.assign(defPack,pack);
}

async function systemSync(pack={
    service:routers[device_id]
}){
    const req = packMaker(pack,WebApiType.SYNC);
    emitter.emit(WebApiType.SYNC,req);
    return req.sid;
}

async function systemAck(pack={
    service:routers[device_id]
}){
    const req = packMaker(pack,WebApiType.ACK);
    emitter.emit(WebApiType.ACK,req);
    return req.sid;
}

async function serviceSearch(){
    const sid = await systemSync();
    await systemAck();
    await wait();
    // console.log(sid);
}

module.exports = {
    WebApi:{
        systemSync,
        systemAck,
        serviceSearch,
    },
    WebApiType
}

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
    routers[device_id] = {
        "online":[]
    };
}
init();

const WebApiType = {
    SYNC:"sync",
    SEARCH:"search",
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

async function systemSync(pack={}){
    const req = packMaker(pack,WebApiType.SYNC);
    emitter.emit(WebApiType.SYNC,req);
    return req.sid;
}

async function serviceSearch(){
    const sid = await systemSync();
    await wait();
    console.log(sid);
}

module.exports = {
    WebApi:{
        systemSync,
        serviceSearch
    },
    WebApiType
}

const emitter = require("../device/emitter");
const {tools:{id,wait}} = require("../utils");
const {device_id} = require("../config");
const { validate } = require('uuid');

const WebApiType = {
    SYNC:"sync",
    ACK:"ack",
    P2P:"p2p",
    ONCALL:"oncall",
    BROADCAST:"broadcast",
}

const STATE = {
    RESET:"reset",
    SYNC:"sync",
    UPDATE:"update",
}

const nodes = {};

const routers = {};

const buffer = new Proxy({},{
    get(target,key){
        switch(key){
            case STATE.RESET:
                Object.keys(target).forEach(device_id=>delete target[device_id]);
                return;
            case STATE.SYNC:
                return;
            case STATE.UPDATE:
                console.clear();
                console.log(Object.keys(target));
                return;
                Object.keys(nodes).forEach(device_id=>{
                    if(!target[device_id]){
                        delete nodes[device_id];
                        delete routers[device_id];
                    }
                });
                Object.keys(target).forEach(device_id=>{
                    nodes[device_id] = true;
                    routers[device_id] = target[device_id];
                });
                console.clear();
                // console.log(nodes);
                return;
        }
        return target[key];
    },
    set(target,key,value){
        const {origin,timestamp} = value;
        if(validate(key)){
            if(target[origin]&&target[origin].timestamp<=timestamp){
                delete target[origin];
                target[origin] = value;
            }else{
                target[origin] = value;
            }
        }
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


function packMaker(pack = {},event=null){
    const defPack = {
        sid:id(),
        rid:null,
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

async function systemAck(pack){
    const {sid} = pack;
    const req = packMaker({
        service:routers[device_id],
        rid:sid
    },WebApiType.ACK);
    // const {origin} = req;
    // buffer[origin] = req;
    emitter.emit(WebApiType.ACK,req);
    return req.sid;
}

let lock = false;
async function serviceSearch(){
    if(lock)return;
    lock = true;
    console.clear();
    console.log("发送信号搜索");
    // buffer[STATE.RESET];
    const sid = await systemSync();
    const list = await waitAckRecive(sid);
    await wait();
    // buffer[STATE.UPDATE];
    console.log(Object.keys(list));
    lock = false;
    // console.log(sid);
}

setInterval(()=>{
    serviceSearch()
},10000);

async function waitAckRecive(sid){
    console.log(sid);
    return await new Promise(async resolve=>{
        const list = {};
        const handle = pack=>{
            const {rid,origin} = pack;
            console.log(rid,origin);
            list[origin] = pack;
        }
        emitter.on(sid,handle);
        await wait();
        emitter.removeListener(sid,handle);
        list[device_id] = routers[device_id];
        resolve(list);
    });
}

module.exports = {
    WebApi:{
        systemSync,
        systemAck,
        serviceSearch,
    },
    WebApiType
}

const emitter = require("../device/emitter");
const {tools:{id,wait}} = require("../utils");
const {device_id,port} = require("../config");
const { validate } = require('uuid');
const {createTask} = require("../device/task/schedule");

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

const FIELD = {
    SELF:"self",
    ALL:"all"
};

const nodes = {};

function init(){
    nodes[device_id] = {
        core:device_id,
        startstamp:Date.now(),
        service:{}
    };
}
init();


function packMaker(pack = {},event=null){
    const defPack = {
        sid:id(),
        rid:null,
        origin:device_id,
        timestamp:Date.now(),
        event,
        field:FIELD.ALL
    }
    return Object.assign(defPack,pack);
}

async function systemSync(pack={}){
    const req = packMaker(pack,WebApiType.SYNC);
    emitter.emit(WebApiType.SYNC,req);
    return req.sid;
}

async function systemP2P(pack={targets:[]}){
    const req = packMaker(pack,WebApiType.P2P);
    // emitter.emit(WebApiType.P2P,req);
    await systemBroadcast(WebApiType.P2P,req);
    return req.sid;
}

async function systemOnCall(pack={targets:[]}){
    const req = packMaker(pack,WebApiType.P2P);
    emitter.emit(WebApiType.P2P,req);
    return req.sid;
}

async function systemAck(pack){
    const {sid} = pack;
    const req = packMaker({
        node:nodes[device_id],
        rid:sid
    },WebApiType.ACK);
    emitter.emit(WebApiType.ACK,req);
    return req.sid;
}

async function systemBroadcast(eventName,pack){
    emitter.emit(WebApiType.BROADCAST,eventName,pack);
}

async function unionAck(pack){
    const {sid} = pack;
    let req = {...pack};
    delete req[sid];
    req.rid = sid;
    req = packMaker(req,WebApiType.ACK);
    emitter.emit(WebApiType.ACK,req);
    return req.sid;
}

let lock = false;
async function serviceSearch(field){
    if(lock)return;
    lock = true;
    console.clear();
    console.log("发送信号搜索");
    console.log(port,new Date());
    // buffer[STATE.RESET];
    const sid = await systemSync({field});
    const pack = await waitAckRecive(sid);
    // await wait();
    // buffer[STATE.UPDATE];
    console.log(Object.keys(pack));
    Object.keys(nodes).forEach(did=>{
        if(!pack[did])delete nodes[did];
    });
    Object.keys(pack).forEach(did=>{
        nodes[did]=pack[did];
    })
    lock = false;
    // console.log(sid);
}

async function confirmServiceSearch(field){
    lock = true;
    return serviceSearch(field);
}

createTask(()=>serviceSearch(FIELD.SELF),"30");

port=="10000"&&createTask(()=>{
    const targets = Object.keys(nodes);
    console.log(device_id,'发送消息');
    systemP2P({targets});
},"5");

port=="10001"&&createTask(()=>{
    const targets = Object.keys(nodes);
    console.log(device_id,'发送消息');
    systemP2P({targets});
},"10");

port=="10002"&&createTask(()=>{
    const targets = Object.keys(nodes);
    console.log(device_id,'发送消息');
    systemP2P({targets});
},"15");

port=="10003"&&createTask(()=>{
    const targets = Object.keys(nodes);
    console.log(device_id,'发送消息');
    systemP2P({targets});
},"45");

async function waitAckRecive(sid){
    console.log(device_id);
    return await new Promise(async resolve=>{
        const list = {};
        const handle = pack=>{
            const {rid,origin,node} = pack;
            // console.log(rid,origin);
            list[origin] = node;
        }
        emitter.on(sid,handle);
        await wait(100);
        emitter.removeListener(sid,handle);
        list[device_id] = nodes[device_id];
        resolve(list);
    });
}

module.exports = {
    WebApi:{
        systemBroadcast,
        systemSync,
        systemAck,
        systemP2P,
        systemOnCall,
        serviceSearch,
        confirmServiceSearch,
        unionAck,
    },
    WebApiType,
    FIELD,
}

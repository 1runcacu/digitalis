const dev = require('./dev');
const prod = require('./prod');
const {tools:{id}} = require("../utils");
const {parse} = require('../utils');
const inConfig = parse(process.argv.slice(2));


module.exports = Object.assign(inConfig.mode==="development"?dev:prod,{
    field:"com",
    device_id:id(),
    time_stamp:Date.now(),
},(()=>{
    const config = {
        ...inConfig,
    }
    for(let key in config){
        if(config[key]){
            config[key.slice(1)]=config[key];
        }
        delete config[key];
    }
    return config;
})());

console.log(module.exports);
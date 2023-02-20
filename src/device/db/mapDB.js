const db = {};

const CYCLE_TIME = 60000;

module.exports = {
    set:(key,val,timeout=CYCLE_TIME)=>{
        key&&(db[key]=val);
        timeout&&setTimeout(() => {
           delete db[key]; 
        }, timeout);
    },
    get:(key)=>db[key],
    has:(key)=>db[key]!=undefined
}

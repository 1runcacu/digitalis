/**
 * https://www.jianshu.com/p/8d303ff8fdeb
 */

const schedule = require('node-schedule');

function createTask(task=()=>{},s="30",m="*",h="*",M="*",y="*",w="*"){
    const scl = schedule.scheduleJob(`${s} ${m} ${h} ${M} ${y} ${w}`, task);
    return {
        close:()=>scl.cancel()
    }
}

module.exports = {
    createTask
}
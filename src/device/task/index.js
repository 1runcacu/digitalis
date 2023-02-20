const tasks = {};
const {tools:{id}} = require("../../utils");
/**
 * {
 *      tid,
 *      timestamp,
 *      task,
 *      delay?0,
 *      timeout?
 *      status,
 *      once?
 * }
 */

const STATUS_PENDING = "pending";
const STATUS_RUNING = "runing";
const STATUS_FINISH = "finish";

setInterval(()=>{
    Object.values(tasks).forEach(item=>{
        const {tid,task,freq,lock,once,status} = item;
        if(lock)return;
        switch(status){
            case STATUS_PENDING:
                new Promise(resolve=>{
                    async function run(){
                        item.status = STATUS_RUNING;
                        try{
                            const result = await task();
                            resolve({code:0,result,msg:"success"})
                        }catch(err){
                            resolve({code:500,msg:err})
                        }finally{
                            setTimeout(() => {
                                item.status = STATUS_FINISH;
                            }, freq);
                        }
                    }
                    run();
                });
                break;
            case STATUS_FINISH:
                item.status = STATUS_PENDING;
                if(once)delete tasks[tid];
                break;
        }
    });
},0);

module.exports = {
    start:(task,config={})=>{
        const tid = id();
        if(task){
            tasks[tid] = {
                tid,
                timestamp:Date.now(),
                task,
                freq:1000,
                lock:false,
                once:false,
                status:STATUS_PENDING,
                ...config
            }
        }
    },
    find:tid=>tid,
    stop:tid=>{
        tasks[tid].lock = true;
    },
    delete:tid=>{
        tasks[tid].once = true;
        tasks[tid].status = STATUS_FINISH;
    }
}
module.exports = list=>{
    const cmdMap = {};
    list.reduce((pre,cur)=>{
        if(pre){
            if(/-.+/.test(pre)){
                cmdMap[pre] = cur;
            }
        }
        return cur;
    },undefined);
    return cmdMap;
}
const fs = require('fs');
const path = require("path");

function loader(dirname,exclude=[]){
    const url = dirname.replace(/[^\/\\]+$/,'');
    const file = dirname
    .replace(/^.+[\/\\]+(?=([^\/\\]+\.[^\/\\]+$))/,'')
    .replace(/\.[^\.]+$/,'');
    const map = [...exclude,file];
    const res = {}
    const files = fs.readdirSync(url);
    for (let item of files) {
        let fileName = item.replace(/\.[^\.]+$/,'');
        if(map.includes(fileName))continue;
        console.log(`module ${fileName} is loading`);
        const Url = path.normalize(`${url}/${fileName}`);
        res[fileName] = require(Url);
    }
    return res;
}

module.exports=loader;
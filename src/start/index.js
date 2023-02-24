// const {loader} = require("../utils");
// module.exports = loader(__filename);
console.clear();
require("./error");
require("../service");

const ACTION = {
    ALL:"all",
    HOST:'host',
    NODE:'node',
}

const {action:action=ACTION.HOST} = require("../config");

switch(action){
    case ACTION.ALL:
        require("../device/server/net");
        require("../device/client/net");
        require("../device/server/node");
        require("../device/server/node");
        break;
    default:
    case ACTION.HOST:
        require("../device/server/net");
        require("../device/client/net");
        require("../device/server/node");
        break;
    case ACTION.NODE:
        require("../device/client/node");
        break;
}
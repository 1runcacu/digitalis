const emitter = require("../device/emitter");
const {tools:{install}} = require("../utils");

const systemCores = require("./system/index");


install(systemCores,emitter);
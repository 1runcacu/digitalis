// const {loader} = require("../utils");
// module.exports = loader(__filename);
module.exports = {
    error:require("./error")
};
const NetServer = require("../device/server/net");
const NetClient = require("../device/client/net");

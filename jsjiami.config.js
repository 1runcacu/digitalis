const path = require('path');
module.exports = {
    files:[
        path.join(__dirname,'./dist/index.js')
    ],
    output:path.join(__dirname,'../'),
    option:{
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.5,
        debugProtection: true,
        debugProtectionInterval: true,
        disableConsoleOutput: false,
        stringArrayEncoding: ['rc4'],
        stringArrayRotate: true,
        stringArrayThreshold: 0.75,
        renameProperties: true,
        renamePropertiesMode: 'safe',
    }
}
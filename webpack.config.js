const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    //入口文件
    entry: './src/index.js',
    //输出文件
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "production",
    target: "node",
    externals: {
        bufferutil: "bufferutil",
        "utf-8-validate": "utf-8-validate",
    },
};
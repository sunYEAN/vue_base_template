const url = require('url');
const AliOss = require('ali-oss');
const {readdirSync} = require('fs');
const {resolve} = require('path');


class OssWebpackPlugin {

    constructor(options) {


        this.options = {
            path: 'websources', // 相对于bucket的根路径
            region: '',
            bucket: '',
            project: 'vue-demo',
            accessKeyId: '',
            accessKeySecret: '',
        };
        Object.assign(this.options, options);
        this.client = new AliOss({
            region: 'oss-xx-beijing',
            accessKeyId: 'xxx',
            accessKeySecret: 'xxx',
            bucket: 'wtutu'
        });

        this.publicPath = `${this.options.path}/${this.options.project}`;
    }

    check_project () {}
    check_version () {}

    apply (compiler) {
        compiler.hooks.emit.tapAsync('OssWebpackPlugin', (compilation, callback) => {
            console.log(compilation.assets)
            callback();
        });
    }
}



module.exports = OssWebpackPlugin;


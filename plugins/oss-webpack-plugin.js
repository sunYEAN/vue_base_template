const url = require('url');
const AliOss = require('ali-oss');


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
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAI4G9jnmJGDyWaAskXmmYq',
            accessKeySecret: 'W9Tji761P4QEmSLmZCspqMl9whpngn',
            bucket: 'wtutu'
        });

        this.publicPath = `${this.options.path}/${this.options.project}`;
    }

    check_project () {}
    check_version () {}

    apply (compiler) {
        compiler.hooks.compilation.tap('OssWebpackPlugin', (compilation, callback) => {

            console.log(123);

        });
    }
}



module.exports = OssWebpackPlugin;


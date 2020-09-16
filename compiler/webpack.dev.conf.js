const path = require('path');
const Base = require('./webpack.base.conf');
const {merge} = require('webpack-merge');
const packageJson = require('../package');
const resolve = (...args) => path.resolve(__dirname, '../', ...args);


module.exports = merge(Base, {
    mode: 'development',
    devServer: {
        contentBase: resolve('dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        port: packageJson.app.port,
    }
});

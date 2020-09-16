const path = require('path');
const Base = require('./webpack.base.conf');
const Merge = require('webpack-merge');
const packageJson = require('../package');

module.exports = Merge(Base, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        port: packageJson.app.port,
    }
});

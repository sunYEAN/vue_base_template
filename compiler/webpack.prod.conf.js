const path = require('path');
const Base = require('./webpack.base.conf');
const {merge} = require('webpack-merge');
const resolve = (...args) => path.resolve(__dirname, '../', ...args);
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(Base, {
    mode: 'production',
    output: {
        path: resolve('dist'),
        publicPath: './',
        filename: 'js/main.[chunkhash:8].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css'
        }),
    ],
    optimization: {
        minimizer: [
            // 压缩css文件
            new OptimizeCSSAssetsPlugin()
        ]
    }
});

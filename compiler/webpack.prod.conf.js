const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Base = require('./webpack.base.conf');
const Merge = require('webpack-merge');

module.exports = Merge(Base, {
    mode: 'production',
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

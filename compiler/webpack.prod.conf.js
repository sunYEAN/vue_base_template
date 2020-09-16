const path = require('path');
const Base = require('./webpack.base.conf');
const {merge} = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(Base, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'js/main.[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './',
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: `imgs/[contenthash:6].[ext]`
                        }
                    },
                ]
            },
        ]
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

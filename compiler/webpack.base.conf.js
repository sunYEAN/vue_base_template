const path = require('path');
const webpack = require('webpack');
const dllConfig = require('./webpack.dll.config');
const packageJson = require('../package');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const resolve = (...args) => path.resolve(__dirname, ...args);
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const OssWebpackPlugin = require('./plugins/oss-webpack-plugin');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const HappyPack = require('happypack');

const isDev = process.env.NODE_ENV === 'development';

const createDllReferencePlugin = (path) => {
    return Object.keys(dllConfig.entry).map(key => {
        return new webpack.DllReferencePlugin({
            manifest: `${path}/${key}-manifest.json`
        })
    })
};

const config = {
    entry: resolve('src', 'main.js'),
    output: {
        path: resolve('dist'),
        publicPath: "./",
        filename: isDev ? 'js/main.js' : "js/main.[chunkhash:8].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                    }
                ],
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                type: 'javascript/auto',
                loader: 'json-loader'
            },
            {
                test: /\.(woff)|(svg)|(eot)|(ttf)$/,
                loader: 'url-loader',
                options: {
                    outputPath: 'font'
                }
            },
            {
                test: /\.(css|less)$/,
                use: [
                    isDev ? 'style-loader' : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            publicPath: './',
                            reloadAll: true,
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
                            name: `imgs/[${isDev ? 'name' : 'contenthash:8'}].[ext]`
                        }
                    },
                ]
            },
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '.css']
    },
    plugins: [

        new HappyPack({loaders: ['babel-loader']}),

        new VueLoaderPlugin(),

        new HTMLWebpackPlugin({
            template: resolve('src', 'index.html'),
            app: packageJson.app,
            env: process.env.NODE_ENV
        }),

        ...createDllReferencePlugin(resolve('dll')),

        // 将dll文件添加到 html 中
        new AddAssetHtmlPlugin({
            filepath: resolve('dll', '*.dll.js'),
            outputPath: 'js',
            publicPath: "./js"
        }),

        new CopyWebpackPlugin({
            patterns: [{
                from: resolve('src', 'static'),
                to: 'static',
            }]
        }),

    ],
};

// 打包速度
// smp 导致 AddAssetHtmlPlugin 失败
// const smp = new SpeedMeasurePlugin({
//     outputFormat: 'function'
// });

module.exports = config;

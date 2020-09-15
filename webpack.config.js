const path = require('path');
const webpack = require('webpack');
const dllConfig = require('./webpack.dll.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const resolve = (...args) => path.resolve(__dirname, ...args);
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HappyPack = require('happypack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';

const createDllReferencePlugin = (path) => {
    return Object.keys(dllConfig.entry).map(key => {
        return new webpack.DllReferencePlugin({
            manifest: `${path}/${key}-manifest.json`
        })
    })
};

const config = {
    mode: isDev ? 'development' : 'production',
    entry: resolve('./src/main.js'),
    output: {
        path: resolve('./dist'),
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
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            {
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
                        use: [
                            {
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
                    }
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
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: resolve('./index.html')
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
        }),
        ...createDllReferencePlugin(resolve('./dll')),

        // 将dll文件添加到 html 中
        new AddAssetHtmlPlugin({
            filepath: resolve('./dll/*.dll.js'),
        }),

        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/static',
                to: 'static',
                context: resolve()
            }]
        })
    ],
    performance: {
        hints: 'warning'
    },

};

// 开发环境
if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: 8080
    }
} else {
    Object.assign(config, {
        optimization: {
            minimizer: [
                // 压缩css文件
                new OptimizeCSSAssetsPlugin()
            ],
        }
    });
}

// 打包速度
const smp = new SpeedMeasurePlugin({
    outputFormat: 'function'
});

// 多进程打包
config.plugins.push(new HappyPack({loaders: ['babel-loader']}));
module.exports = isDev ? config : smp.wrap(config);

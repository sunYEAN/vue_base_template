const path = require('path');
const resolve = (...args) => path.resolve(__dirname, ...args);
const webpack = require('webpack');
const dllConfig = require('./webpack.dll.config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');


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
    resolve: {
        extensions: ['.vue', '.js', '.css']
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
                test: /\.(css|less)$/,
                oneOf:  [
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    hmr: isDev,
                                    reloadAll: true,
                                }
                            },
                            {
                                loader: 'css-loader',
                                // options: {
                                //     esModule: true,
                                //     modules: {
                                //         namedExport: true,
                                //         localIdentName: '[local]_[contenthash:5]',
                                //     },
                                // },
                            },
                            'less-loader'
                        ]

                    },
                    {
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    hmr: isDev,
                                    reloadAll: true,
                                }
                            },
                            'css-loader',
                            'less-loader'
                        ]
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name() {
                                if (isDev) {
                                    return 'imgs/[path].[name].[ext]'
                                }
                                return 'imgs/[contenthash:8].[ext]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    performance: {
        hints: 'warning'
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
        })
    ]
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

module.exports = config;

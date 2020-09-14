const path = require('path');
const resolve = (p) => path.resolve(__dirname, p);
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';


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
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev, // 热更新，修改了css 自动更新
                            esModule: true,
                            reloadAll: true,
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name () {
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
    plugins: [
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: resolve('./index.html')
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:8].css'
        }),
    ]
};

// 开发环境
if (isDev) {
    config.devServer = {
        host: '0.0.0.0',
        port: 8080
    }
} else {
    // config.plugins.push(
    //
    // )
    config.optimization = {
        minimizer: [
            // 压缩css文件
            new OptimizeCSSAssetsPlugin({})
        ],
        // 优化的点
        splitChunks: {

        }
    }
}

module.exports = config;

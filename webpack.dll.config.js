const path = require('path');
const webpack = require('webpack');
const resolve = (p) => path.resolve(__dirname, p);
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const packageJSon = require('./package');

const config = {
    mode: 'production',
    entry: packageJSon.app.dll,

    output: {
        path: resolve('./dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            path: resolve('./dll/[name]-manifest.json'),
            name: '[name]_library',
        }),
    ],
};

module.exports = config;

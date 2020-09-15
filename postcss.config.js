module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-plugin-px2rem': {
            rootValue: 100,
            minPixelValue: 2,
            selectorBlackList: ['.no-replace-rem']
        }
    }
};

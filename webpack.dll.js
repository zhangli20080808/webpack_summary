const path = require('path')
const webpack = require('webpack')
module.exports = {
    mode: "production",
    entry: {
        vendors: ['lodash'],
        react: ['react', 'react-dom'],
        jquery: ['jquery']
    },
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, './dll'),
        //把打包生成的文件通过全局变量的形式暴露出来
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, './dll/[name].manifest.json')
        })
    ]

}
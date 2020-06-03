const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const devConfig = {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: './dist',
        open: true,
        port: 8081,
        hot: true,
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7010',
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/, // 指定匹配规则
                use: {
                    loader: 'url-loader', //内部使用了file-loader 强化本
                    options: {
                        name: '[name].png',
                        outputPath: 'images/',
                        limit: 2048, // 图片11kb 如果小于这个设置 转化成base64  没有生成新的images页面显示base64了
                    },
                },
            },
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                }
                //新建.babelrc⽂件，把options部分移⼊到该⽂件中
            },
            /*
            * useBuiltIns 选项是 babel 7 的新功能，这个选项告诉 babel 如何配置 @babel/polyfill
            * 三个参数
            * entry: 需要
                在webpack 的⼊⼝⽂件⾥ import "@babel/polyfill" ⼀次。 babel 会根
                据你的使⽤情况导⼊垫⽚，没有使⽤的功能不会被导⼊相应的垫⽚。
                *
              usage: 不需要 import ，全⾃动检测，但是要安装 @babel/polyfill 。（试验阶段）
              *
              false: 如果你import "@babel/polyfill" ，它不会排除
                掉没有使⽤的垫⽚，程序体积会庞⼤。(不推荐)
            * */
            {
                test: /\.(woff2|woff)$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
};

module.exports = webpackMerge(baseConfig, devConfig)
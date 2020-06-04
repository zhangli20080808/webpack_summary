const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用内置的 CleanWebpackPlugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const merge = require('webpack-merge')

const prodConfig = require('./webpack.pro')

const devConfig = require('./webpack.dev')

const baseDir = path.resolve(__dirname, './src/pages');
// 同步版本的 fs.readdir() 。 fs.readdirSync
const entries = fs.readdirSync(baseDir).reduce(function (entries, dir) {
    const fullPath = path.resolve(baseDir, dir);
    const entry = path.join(fullPath, 'index.jsx');
    if (fs.statSync(fullPath).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = entry;
    }
    return entries;
}, {});

const htmlPlugin = Object.keys(entries).map((key) => {
    const title = key === 'index' ? '首页' : '登录';
    return new HtmlWebpackPlugin({
        title,
        template: path.resolve(__dirname, './src/index.html'),
        inject: true,
        chunks: [`${key}`, 'common', 'vendor', 'react_vendors'],
        filename: `${key}.html`,
    });
});

const commonConfig = {
    entry: entries,
    resolve: {
        //配置文件后缀
        extensions: ['.js', '.jsx'],
        alias: {
            zl: path.resolve(__dirname, './src/zl')
        }
    },
    plugins: [
        ...htmlPlugin,
        new CleanWebpackPlugin()
    ]
}

module.exports = (env) => {
    // console.log(env,'env')  //{ production: true }
    if (env && env.production) {
        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}

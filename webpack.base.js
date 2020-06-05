const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        chunks: [`${key}`, 'common', 'vendors'],
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
    performance: false,
    /*
    *  DllReferencePlugin 引用插件
    *  当我们打包index的时候 会引入一些第三方的文件 先去 manifest 找映射关系
    *  如果能找到 那这些第三方模块就没必要打包进来了 直接从 vendors.dll拿来用就行了
    *  如何拿？ 去全局变量找
    *  不用之前 大约 1990ms  之后992ms
    * */
    // plugins: [
    // ...htmlPlugin,
    // new AddAssetHtmlPlugin({
    //     filepath: path.resolve(__dirname, './dll/vendors.dll.js')
    // }),
    // new AddAssetHtmlPlugin({
    //     filepath: path.resolve(__dirname, './dll/react.dll.js')
    // }),
    //
    // new webpack.DllReferencePlugin({
    //     manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
    // }),
    // new webpack.DllReferencePlugin({
    //     manifest: path.resolve(__dirname, './dll/react.manifest.json')
    // }),
    // ]
    plugins: [
        ...htmlPlugin
    ],
    optimization: {
        usedExports :true
    }
}

module.exports = (env) => {
    // console.log(env,'env')  //{ production: true }
    if (env && env.production) {

        return merge(commonConfig, prodConfig)
    } else {
        return merge(commonConfig, devConfig)
    }
}

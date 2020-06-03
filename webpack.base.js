const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用内置的 CleanWebpackPlugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const baseDir = path.resolve(__dirname, './src/pages');
// 同步版本的 fs.readdir() 。 fs.readdirSync
const entries = fs.readdirSync(baseDir).reduce(function (entries, dir) {
    const fullPath = path.resolve(baseDir, dir);
    const entry = path.join(fullPath, 'index.js');
    if (fs.statSync(fullPath).isDirectory() && fs.existsSync(entry)) {
        entries[dir] = entry;
    }
    return entries;
}, {});

const htmlPlugin = Object.keys(entries).map((key) => {
    const title = key === 'index' ? '首页' : '登录';
    return new HtmlWebpackPlugin({
        title,
        template: './src/index.html',
        inject: true,
        chunks: [key],
        filename: `${key}.html`,
    });
});

module.exports = {
    entry: entries,
    plugins: [
        ...htmlPlugin,
        new CleanWebpackPlugin()
    ]
}


const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge')

const prodConfig = require('./webpack.pro')

const devConfig = require('./webpack.dev')

const baseDir = path.resolve(__dirname, './src/pages')
// fs.stat与fs.statSync判断文件/目录是否存在
// 同步版本的 fs.readdir() 。 fs.readdirSync 方法将返回一个包含“指定目录下所有文件名称”的数组对象。
const entries = fs.readdirSync(baseDir).reduce(function (entries, dir) {
  const fullPath = path.resolve(baseDir, dir)
  const entry = path.join(fullPath, 'index.jsx')
  if (fs.statSync(fullPath).isDirectory() && fs.existsSync(entry)) {
    entries[dir] = entry
  }
  return entries
}, {})

const htmlPlugin = Object.keys(entries).map((key) => {
  const title = key === 'index.less' ? '首页' : '登录'
  return new HtmlWebpackPlugin({
    title,
    template: path.resolve(__dirname, './src/index.html'),
    inject: true,
    // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 login），默认全部引用
    chunks: [`${key}`, 'common', 'vendors'], // 要考虑代码分割
    filename: `${key}.html`,
  })
})

const commonConfig = {
  entry: entries,
  // entry: {
  //   index: path.join(baseDir, 'index', 'index.jsx'),
  //   login: path.join(baseDir, 'login', 'index.jsx')
  // },
  resolve: {
    //配置文件后缀
    extensions: ['.js', '.jsx'],
    alias: {
      zl: path.resolve(__dirname, './src/zl'),
      style: path.resolve(__dirname, './src/style')
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
    // 给 tree shaking 使用的
    usedExports: true
  }
}

module.exports = (env) => {
  // console.log(env,'env')  //{ production: true }
  if (env && env.production) {
    console.log('prod')
    return merge(commonConfig, prodConfig)
  } else {
    console.log('123')
    return merge(commonConfig, devConfig)
  }
}

const path = require('path');
const fs = require('fs');
// 使用内置的 CleanWebpackPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const plugins = [new CleanWebpackPlugin()];

const files = fs.readdirSync(path.resolve(__dirname, './dll'));
files.forEach((file) => {
  if (/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, './dll', file),
      })
    );
  }
  if (/.*\.manifest.json/.test(file)) {
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, './dll', file),
      })
    );
  }
});

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    // chunkFilename: "[name].chunk.js",
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    // open: true,
    port: 8081,
    hot: true,
    // hotOnly: true,
    progress: true, // 显示打包的进度条
    compress: true, // 启动 gzip 压缩
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
            // 小于 2kb 的图片用 base64 格式产出
            // 否则，依然延用 file-loader 的形式，产出 url 格式
            limit: 2 * 1024, // 图片11kb 如果小于这个设置 转化成base64  没有生成新的images页面显示base64了
            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.abc.com'
          },
        },
      },
      {
        test: /\.jsx?$/,
        // 排除范围
        exclude: '/node_modules/', //记得要配置 提高js模块打包速度
         // include: path.resolve(__dirname,'./src'),
        // use: {
        //   loader: 'babel-loader',
        // },
        loader: ['babel-loader?cacheDirectory'], //开启缓存 只要es6代码没改 就不重新编译

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
        test: /\.css$/,
        // loader 的执行顺序是：从后往前
        loader: ['style-loader', 'css-loader', 'postcss-loader'], // 加了 postcss
      },
      {
        test: /\.less$/,
        // 增加 'less-loader' ，注意顺序
        loader: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      //默认是⽀持异步，我们使⽤all  对同步 initial，异步 async
      chunks: 'all',
      minSize: 30000, //最⼩尺⼨，当模块⼤于30kb
      maxSize: 0, //对模块进⾏⼆次分割时使⽤，不推荐使⽤
      minChunks: 1, //打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块 比如我们的react react-dom只引用了一次
      maxAsyncRequests: 5, //最⼤异步请求数，默认5  比如我们异步import了5个文件
      maxInitialRequests: 3, //最⼤初始化请求书，⼊⼝⽂件同步请求，默认3 比如我们import了3个文件同步
      automaticNameDelimiter: '_', //打包分割符号
      name: true, //打包后的名称，除了布尔值，还可以接收⼀个函数
      //打包同步代码的时候 继续走cacheGroups里面的配置 缓存组 把某一块抽离成单独的模块
      // react_vendors vendors_index 打包出来的这个文件右prop-types等构成
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // 要缓存的 分隔出来的 chunk 名称
          priority: -10, //缓存组优先级 数字越⼤，优先级越⾼
        },
        // commons: {
        //     test: /(react|react-dom)/,
        //     name: "react_vendors",
        //     chunks: "all"
        // },
        // default: {
        //     // minChunks: 2,
        //     priority: -20,
        //     //如果一个模块已经被打包过了就忽略这个模块 复用之前已经打包过的模块
        //     reuseExistingChunk: true,
        //     filename: "common.js"
        // }
      },
    },
  },
  plugins: [...plugins, new webpack.HotModuleReplacementPlugin()],
};

// module.exports = webpackMerge(baseConfig, devConfig)

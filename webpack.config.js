const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  //   entry: "./src/index.js",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    //js模块，咱们就是chunkhash
    filename: "[name]_[contenthash:8].js"
    // filename: "[name].js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: "url-loader",
        use: {
          loader: "url-loader",
          options: {
            name: "[name].png",
            outputPath: "images/",
            limit: 2048
          }
        }
      },
      {
        test: /\.(woff2|woff)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "首页",
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      title: "注册",
      template: "./src/index.html",
      inject: true,
      chunks: ["login"],
      filename: "login.html"
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css"
    })
  ]

  //   watch: true, //false
  //   watchOptions: {
  //     //默认为空，不监听的文件或者目录，支持正则
  //     ignored: /node_modules/,
  //     //监听到文件变化后，等300ms再去执行，默认300ms,
  //     aggregateTimeout: 300,
  //     //判断文件是否发生变化是通过不停的询问系统指定文件有没有变化，默认每秒问1次
  //     poll: 1000//ms
  //   }
};

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]_[chunkhash:8].js',
    },
    mode: 'production',
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
            },
            {
                test: /\.(woff2|woff)$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                ],
            },
        ],
    },
    devtool: "none",

    optimization: {
        splitChunks: {
            //默认是⽀持异步，我们使⽤all  对同步 initial，异步 async
            chunks: "all",
            minSize: 30000,//最⼩尺⼨，当模块⼤于30kb
            maxSize: 0,//对模块进⾏⼆次分割时使⽤，不推荐使⽤
            minChunks: 1,//打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块 比如我们的react react-dom只引用了一次
            maxAsyncRequests: 5,//最⼤异步请求数，默认5  比如我们异步import了5个文件
            maxInitialRequests: 3,//最⼤初始化请求书，⼊⼝⽂件同步请求，默认3 比如我们import了3个文件同步
            automaticNameDelimiter: '_',//打包分割符号
            name: true,//打包后的名称，除了布尔值，还可以接收⼀个函数
            //打包同步代码的时候 继续走cacheGroups里面的配置 缓存组 把某一块抽离成单独的模块
            // react_vendors vendors_index 打包出来的这个文件右prop-types等构成
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors", // 要缓存的 分隔出来的 chunk 名称
                    priority: -10//缓存组优先级 数字越⼤，优先级越⾼
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
            }
        },
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
    ]
}
// module.exports = webpackMerge(baseConfig, proConfig)
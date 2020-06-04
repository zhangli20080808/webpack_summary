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
            // {
            //     test: /\.js$/,
            //     exclude: '/node_modules/',
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ["@babel/preset-env",
            //             {
            //                 targets: {
            //                     edge: "17",
            //                     firefox: "60",
            //                     chrome: "67",
            //                     safari: "11.1"
            //                 },
            //                 useBuiltIns: "usage"//按需注⼊
            //
            //             }],
            //
            //     }
            //
            // },
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

    // 生产模式会自动开启
    optimization: {
        // usedExports: true,
        minimizer: [new OptimizeCssAssetsPlugin({})]
    },

    plugins: [

        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
    ]
}
// module.exports = webpackMerge(baseConfig, proConfig)
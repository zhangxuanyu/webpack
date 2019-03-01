const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index:'./src/index.js',
        out:'./src/out.js'
    },    // 入口文件
    output: {
        filename: '[name].js',      // 打包后的文件名称
        path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
    },
    // 提取公共代码
   optimization: {
    splitChunks: {
        cacheGroups: {
            vendor: {   // 抽离第三方插件
                test: /node_modules/,   // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor',  // 打包后的文件名，任意命名    
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: 10    
            },
            utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                chunks: 'initial',
                name: 'utils',  // 任意命名
                minSize: 0    // 只要超出0字节就生成一个新包
            }
        }
    }
   },
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    },
    mode:'production',
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules)/,
                use:{
                    loader:"babel-loader"
                }
            },
            {
                test:/\.css$/,
                exclude: /(node_modules)/,
                use: [{loader:'style-loader'},{loader:'css-loader'}]       
            },
            {
                test:/\.scss$/,
                exclude: /(node_modules)/,
                    // 将css用link的方式引入就不再需要style-loader了
                use:[
                        {
                            loader:'style-loader'
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                ]       
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            // template: './src/index.html',   
            filename: 'index.html',
            chunks: ['index']   // 对应关系,index.js对应的是index.html
        }),
        new HtmlWebpackPlugin({
            // template: './src/out.html',   
            filename: 'out.html',
            chunks: ['out']   // 对应关系,index.js对应的是index.html
        }),
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin()
        
    ]
}


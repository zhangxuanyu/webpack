const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: 'css-loader'       
                })
            },
            {
                test:/\.scss$/,
                exclude: /(node_modules)/,
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use:[
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]       
                })
                
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
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin({
            filename: 'css/index.css'
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin({
            filename: 'css/out.css'
        })    
    ]
}


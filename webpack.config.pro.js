const path = require ('path');
// html 打包插件
const htmlPlugin = require('html-webpack-plugin');
// css分离与图片路径处理插件
const extractTextPlugin = require('extract-text-webpack-plugin');
// css压缩优化
const optimizeCss = require('optimize-css-assets-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

var website = {
    publicPath:'./'
}
module.exports = {
    // // 入口文件
    entry: {
        Demo1: path.join(__dirname,'./src/Demo1/index.jsx'),
        Demo2: path.join(__dirname,'./src/Demo2/index.jsx'),
        mapSdk: path.join(__dirname,'./src/mapSdk/index.js')
    },
    // 输出文件
    output: {
        path: path.join(__dirname,'./build'),
        filename:'js/[name].[hash].js',
        publicPath: website.publicPath
    },
    // 模式
    mode:'production',   //development   production
    module: {
        rules: [
            {
                test:/\.js|jsx$/,
                use:'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                use: extractTextPlugin.extract({
                    publicPath:'../',
                    fallback: {
                        loader: 'style-loader'
                    },
                    use: [{
                        loader: 'css-loader'
                    }]
                })
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    publicPath:'../',
                    use:[{
                        loader: 'css-loader'
                    },{
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {//css中引入图片
                test: /\.(png|jpg|gif|gsp)/ ,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit:5000,//代表如果图片小于5000字节则会自动压缩成base64编码图片，否则复制文件到生产目录
                        name: '/[name].[hash].[ext]',
                        outputPath:'images/'
                    }
                }] 
            },
            {//html中引入图片
                test:/\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(), // 每次清除已生成
        new htmlPlugin({
            template: './public/index.html',   //html模板
            filename: 'Demo1.html',
            title: 'this is Demo1.html',
            //增加指定的chunks   加载对应js文件
            chunks:['Demo1']
         }),
        new htmlPlugin({
            template: './public/index.html',   //html模板
            filename: 'Demo2.html',
            title: 'this is Demo2.html',
            //增加指定的chunks   加载对应js文件
            chunks:['Demo2']
         }),
        new extractTextPlugin({
            filename:(getPath)=>{
                return getPath('css/[name].[chunkhash].css')
            }
        }),
        new optimizeCss({
            assetNameRegExp:/\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions:{
                preset:['default',{
                    discardComments:{removeAll: true}
                }]
            },
            canPrint: true
        })
    ],
    resolve: {
        extensions:['.js','.jsx','.json','.vue'], //这几个文件的后缀名可以不写
        alias:{
            '@':path.join(__dirname,'./src')  // src路径别名
        }
    }
}
const path = require ('path');
// html 打包插件
const htmlPlugin = require('html-webpack-plugin');
// css分离与图片路径处理插件
const extractTextPlugin = require('extract-text-webpack-plugin');
// css压缩优化
const optimizeCss = require('optimize-css-assets-webpack-plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 创建一个插件实例对象
const htmlWebpackPlugin = new htmlPlugin({
    template: path.join(__dirname, './public/index.html'),//源文件
    filename:'index.html' //生成内存中首页的名称
})
var website = {
    publicPath:'./'
}
module.exports = {
    // 模式
    mode:'development',   //development   production
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
        htmlWebpackPlugin,
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
    },
    devServer:{
        // 提供静态文件目录地址
        // 基于express.static实现
        contentBase: path.join(__dirname, 'dist'),
        // 任意的 404 响应都被替代为 index.html
        // 基于node connect-history-api-fallback包实现
        historyApiFallback: true,
        // 是否一切服务都启用 gzip 压缩
        // 基于node compression包实现
        compress: true,
        // 是否隐藏bundle信息
        noInfo: true,
        // 发生错误是否覆盖在页面上
        overlay: true,
        // 是否开启热加载
        // 必须搭配webpack.HotModuleReplacementPlugin 才能完全启用 HMR。
        // 如果 webpack 或 webpack-dev-server 是通过 --hot 选项启动的，那么这个插件会被自动添加
        hot: true,
        // 热加载模式
        // true代表inline模式，false代表iframe模式
        inline: true, // 默认是true
        // 是否自动打开
        open: true,
        // 设置本地url和端口号
        host: 'localhost',
        port: 8080,
        // 代理
        // 基于node http-proxy-middleware包实现
        proxy: {
            // 匹配api前缀时，则代理到3001端口
            // 即http://localhost:8080/api/123 = http://localhost:3001/api/123
            // 注意:这里是把当前server8080代理到3001，而不是任意端口的api代理到3001
            '/api': 'http://localhost:3001',
            // 设置为true, 本地就会虚拟一个服务器接收你的请求并代你发送该请求
            // 主要解决跨域问题
            changeOrigin: true,
            // 针对代理https
            secure: false,
            // 覆写路径：http://localhost:8080/api/123 = http://localhost:3001/123
            pathRewrite: {'^/api' : ''}
        }
    }
}
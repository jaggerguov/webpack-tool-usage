# webpack-tool-usage 特性列表：
## 1. 多入口项目打包（js/css/html）
## 2. webpack-dev-server启动热更新监听，加载内存中的编译文件
## 3. 支持单独js文件打包（适用于一些sdkt接口的开发，类似于jquery)
## 4. 可扩展增加webpack.config.js文件配置自己规则的打包项目
## 5. 支持react开发

# 使用指导
## 1. 项目下载到本地电脑
## 2. 在项目根目录下执行 npm install
## 3. npm start 启动项目（默认启动的是src下index.js文件里import的项目）
## 4. npm run build 打包所有项目到 build文件
## 5. 可在package.json的scripts里增加自己的打包命令 执行的脚本
## 6. 调试项目的时候如果需要配置 服务ip和端口以及proxy时在 webpack.config.dev.js文件的devServer项下面配置。


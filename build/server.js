// 引入必要的模块
var express = require('express');
var webpack = require('webpack');
var config  = require('./webpack.dev.config');
var history = require('connect-history-api-fallback');
var path    = require('path');
var proxy   = require('http-proxy-middleware');

// 创建一个express实例
var app = express();

/*服务器允许访问的目录 静态资源*/
//console.log(path.resolve(__dirname, '../src'));
//app.use('模拟路径',"要开放的路径");
//app.use('/src',express.static(path.resolve(__dirname, '../src')));
app.use('/static',express.static(path.resolve(__dirname, '../src')));

/*本地与后端联调跨域问题*/
/*所有/api地址重定向到http://192.168.19.122:8889/static,可以统一管理接口地址*/
var exampleProxy = proxy(
    {
       /* target: 'http://127.0.0.1:8889',
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/static'
        }*/
         target: 'http://localhost:6868/vue-php',
         changeOrigin: true,
    }
);
app.use('/api', exampleProxy);

// 调用webpack并把配置传递过去
var compiler = webpack(config)
// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    //quiet: true,
    stats: {
        colors: true,
        chunks: false
    }
})

// 使用 webpack-hot-middleware 中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler,{
    log: () => {}
})

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)

/*app.use(history({
    rewrites: [{ from: /^\/.*$/, to: '/index.html' }],
    disableDotRule: true,
    verbose: true
}));*/

// 监听 8889端口，开启服务器
app.listen(8889, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8889')
})
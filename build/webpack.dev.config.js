var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

config.devtool = 'source-map';
config.output.publicPath = '/';
config.plugins = [
    new webpack.ProvidePlugin({/*导出为全局变量*/
        $: "jquery", jQuery: "jquery", "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['index','vendors','test']
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    }),
   /* new webpack.LoaderOptionsPlugin({
        test: /\.vue$/,
        options: {
            vue: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: 'css-loader'
                    }),
                }
            }
        }
    }),*/
    new ExtractTextPlugin({ filename:'app.css?[hash]',allChunks: true }),/*{ filename:'app.css?[hash]',allChunks: true }*/
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../app/index.html'),
        inject: true,
        hash:false,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        }
    })
];

// 动态向入口配置中注入 webpack-hot-middleware/client (组件改变自动刷新页面)
Object.keys(config.entry).forEach(function (name, i) {
    //console.log(name);
    config.entry[name] = [path.resolve(__dirname, '../build/dev-client')].concat(config.entry[name])
});

module.exports = config;
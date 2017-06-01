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
module.exports = config;
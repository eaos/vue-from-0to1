var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

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
   /* new webpack.optimize.UglifyJsPlugin({
        //sourceMap: true,
        compress: {
            warnings: false
        }
    }),*/
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
/*config.plugins.push(
    new HtmlWebpackPlugin({
        filename: 'index.html',//app/index/index.html
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: true,
        //hash:false,
        //minify: {
           // removeComments: true,
            //collapseWhitespace: true,
            //removeAttributeQuotes: true
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        //}
    })
);
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"'
        }
    })
);*/
module.exports = config;
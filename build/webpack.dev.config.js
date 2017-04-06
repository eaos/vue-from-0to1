var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';
config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'app/index/index.html',
        template: path.resolve(__dirname, '../app/index/index.html'),
        inject: true,
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
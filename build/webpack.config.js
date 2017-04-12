// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

//console.log(__dirname);

module.exports = {
    //devtool: 'cheap-module-source-map',
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
		index:['webpack-hot-middleware/client', path.resolve(__dirname, '../app/index/index.js')],
		 // 需要被提取为公共模块的群组
        vendors:['vue','jquery']
	},
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
		alias: {
			'vue$':'vue/dist/vue.js',
            'jquery':'jquery/dist/jquery.min.js'
		}
    },
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/, 
                loader: 'vue-loader'   
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            },
			// 使用css-loader和style-loader 加载 .css 结尾的文件
            {
                test: /\.css$/,
                // 将样式抽取出来为独立的文件
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'}),
                exclude: /node_modules/
            },
			// 加载图片
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: '[name].[ext]?[hash:7]'
				}
			}
        ]
    },
    plugins: [
		// 压缩代码
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
        new HtmlWebpackPlugin({
            filename: '../index.html',
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
    ]
}
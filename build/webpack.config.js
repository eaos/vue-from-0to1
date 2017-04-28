// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
//console.log(__dirname);
//var production        = process.env.NODE_ENV === 'production';// production environment
//var domain            = process.env.DOMAIN; // your domain process.env.domain

module.exports = {
    //devtool: 'cheap-module-source-map',
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
		index:[path.resolve(__dirname, '../app/index/index.js')],//'webpack-hot-middleware/client',
        test:[path.resolve(__dirname, '../src/t.js'),path.resolve(__dirname, '../src/s.js'),path.resolve(__dirname, '../src/validform.js')],
        vendors:['vue','vue-router','jquery'] /*需要被提取为公共模块的群组*/
	},
    // 输出配置
    output: {
        // 输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].[hash].js'
        //chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
		alias: {
			'vue$':'vue/dist/vue.esm.js',
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
			//使用css-loader和style-loader 加载 .css 结尾的文件
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
        new webpack.ProvidePlugin({/*导出为全局变量*/
            $: "jquery", jQuery: "jquery", "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({
           names: ['index','vendors','test']
        }),
        new webpack.DefinePlugin({
         'process.env': {
         NODE_ENV: '"production"'
         }
         }),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            //sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: path.resolve(__dirname, '../app/index/index.html'),
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
    ]
}
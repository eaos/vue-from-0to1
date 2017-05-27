// nodejs 中的path模块
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
//console.log(__dirname);

module.exports = {
    //devtool: 'source-map',
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
		index:[path.resolve(__dirname, '../app/index.js')],//'webpack-hot-middleware/client',
        test:[path.resolve(__dirname, '../src/t.js'),path.resolve(__dirname, '../src/s.js'),path.resolve(__dirname, '../src/validform.js'),path.resolve(__dirname, '../src/assets/bootstrap/js/bootstrap.min.js')],
        vendors:['vue','vue-router','jquery'] /*需要被提取为公共模块的群组*/
	},
    // 输出配置
    output: {
        //输出路径是 myProject/output/static
        path: path.resolve(__dirname, '../output/static'),
        publicPath: 'static/',
        filename: '[name].js?[hash]'
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
            {
                test: /\.vue$/, 
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader?presets=es2015',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader'}),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap:true } },
                        { loader: 'sass-loader', options: { sourceMap:true } },
                        { loader: 'postcss-loader',options: {
                        // 如果没有options这个选项将会报错 No PostCSS Config found
                        plugins: (loader) => [
                            //require('postcss-scss')(),
                            //require('postcss-import')({root: loader.resourcePath}),
                            require('autoprefixer')(), //CSS浏览器兼容
                            //require('cssnano')()  //压缩css
                        ],
                            sourceMap:true
                    } }]
                }),
                exclude: /node_modules/
            },
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
			},
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
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
        /* new webpack.LoaderOptionsPlugin({
             //minimize: true
         }),*/
        /*new webpack.LoaderOptionsPlugin({
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
        new webpack.optimize.UglifyJsPlugin({
            //sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
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
    ]
}
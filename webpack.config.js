/*
* @Author: lenovo
* @Date:   2018-10-05 00:34:44
* @Last Modified by:   lenovo
* @Last Modified time: 2018-10-15 23:14:44
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');
//环境变量的配置 dev / online  process->node.js中的一个对象
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject : true,
		hash : true,
		chunks : ['common',name]
	}
}
var config = {
	entry : {
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'login' : ['./src/page/login/index.js']
	},
	output : {
		path : './dist', //存放文件的路径
		publicPath : '/dist',//配置访问文件的路径
		filename : 'js/[name].js' 
	},
	externals : {
		//把外部的变量和模块加载进来
		jquery : 'window.jQuery'
	},
	plugins : [
		//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			//name : 'commons',
			name : 'common',
			filename : 'js/base.js'
		}),
		//把css单独打包到文件
		new ExtractTextPlugin('css/[name].css'),
		//html模版的处理
		new HtmlWebPackPlugin(getHtmlConfig('index')),
		new HtmlWebPackPlugin(getHtmlConfig('login'))









		/*new HtmlWebPackPlugin({
			template : './src/view/index.html',
			filename : 'view/index.html',
			inject : true,
			hash :  true,
			//chunks主要用于多入口文件，当你有多个入口文件，那就会编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
			/*

				entry: {
				    index: path.resolve(__dirname, './src/index.js'),
				    devor: path.resolve(__dirname, './src/devor.js'),
				    main: path.resolve(__dirname, './src/main.js')
				}

				plugins: [
				    new httpWebpackPlugin({
				        chunks: ['index','main']
				    })
				]
				那么编译后：

				<script type=text/javascript src="index.js"></script>
				<script type=text/javascript src="main.js"></script>
				如果你没有设置chunks选项，那么默认是全部显示

			
			//需要打包的模块
			chunks : ['common','index']
		})*/
	],
	module : {
		loaders:[
			{
				test : /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader","css-loader")
			},
			{
				test : /\.(gif|png|jpg|jpeg|svg|bmp|woff|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=100&name=resource/[name].[ext]'
			}
		]
	}
}
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:9000/')
}
module.exports = config;
/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 17:04:49 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-28 23:00:29
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');
//环境变量的配置 dev / online  process->node.js中的一个对象
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV)
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
	return {
		template : './src/view/'+ name +'.html',
		filename : 'view/'+ name +'.html',
		inject : true,
		title : title,
		hash : true,
		chunks : ['common',name]
	}
}
var config = {
	entry : {
		'common' : ['./src/page/common/index.js'],
		'index' : ['./src/page/index/index.js'],
		'user-login' : ['./src/page/user-login/index.js'],
		'user-register' : ['./src/page/user-register/index.js'],
		'result' : ['./src/page/result/index.js']
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
		new HtmlWebPackPlugin(getHtmlConfig('index','首页')),
		new HtmlWebPackPlugin(getHtmlConfig('user-login','用户登录')),
		new HtmlWebPackPlugin(getHtmlConfig('user-register','用户注册')),
		new HtmlWebPackPlugin(getHtmlConfig('result','操作结果'))
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
			},
			{
				test : /\.string$/,
				loader: 'html-loader'
			}
		]
	},
	resolve : {
		alias : {
			node_modules : __dirname + '/node_modules',
			util : __dirname + '/src/util',
			page : __dirname + '/src/page',
			service : __dirname + '/src/service',
			image : __dirname + '/src/image'
			
		}
	}
}
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:9000/')
}
module.exports = config;
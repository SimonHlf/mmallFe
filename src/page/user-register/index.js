/*
* @Author: lenovo
* @Date:   2018-04-24 00:03:37
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-28 23:31:19
*/
require('page/common/nav-simple/index.js');
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
// page逻辑
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//验证username
		$("#username").blur(function(){
			var username = $.trim($(this).val());
			if(!username){return;}//用户名为空不做验证
			//异步验证用户名是否存在
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		//注册按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		//如果按下回车，也进行提交注册
		$(".user-content").keyup(function(e){
			if(e.keyCode === 13){//enter键
				_this.submit();
			}
		});
	},
	// 提交表单 伪表单
	submit : function(){
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone : $.trim($('#phone').val()),
			email : $.trim($('#email').val()),
			question : $.trim($('#question').val()),
			answer : $.trim($('#answer').val()),
		};
		//表单验证结果
		var validateResult = this.formValidate(formData);

		if(validateResult.status){//返回值验证成功
			//提交
			_user.register(formData,function(res){
				window.location.href = './result.html?type=register'
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段的验证
	formValidate : function(formData){
		//return 一个结果 如果成功，提示验证成功，失败给出一个错误信息
		var result = {
			status : false,
			msg : ''
		};
		if(!_mm.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于6位';
			return result;
		}
		//验证密码输入是否一致
		if(formData.password != formData.passwordConfirm){
			result.msg = '两次输入的密码不一致';
			return result;
		}
		if(!_mm.validate(formData.phone, 'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		if(!_mm.validate(formData.email, 'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		if(!_mm.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能为空';
			return result;
		}
		if(!_mm.validate(formData.answer, 'require')){
			result.msg = '密码提示答案不能为空';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = "验证通过";
		return result;
	}
};
$(function(){
	page.init();
});
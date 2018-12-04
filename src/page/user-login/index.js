/*
* @Author: lenovo
* @Date:   2018-10-05 00:41:32
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-28 23:28:21
*/
require('./index.css');
require('page/common/nav-simple/index.js');
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
//page逻辑部分
var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按下回车键也可以进行提交
        $('.user-content').keyup(function(ev){
            if(ev.keyCode == 13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password :  $.trim($('#password').val())
        }
        var validateResult = this.formValidate(formData);
        if(validateResult.status){
            //提交
            _user.checkUserLogin(formData,function(){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单验证
    formValidate : function(formData){
        //return result
        var result = {
            status : false,
            msg : ''
        };
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});
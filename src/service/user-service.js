/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 22:43:18 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-28 23:42:14
 */
var _mm = require('util/mm.js');

var _user = {
    //检测用户名是否存在
    checkUsername : function(username,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('./user/check_valid.do'),
            method : 'post',
            data : {
                type : 'username',
                str : username
            },
            success : resolve,
            error : reject
        });
    },
    //用户注册
    register : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('./user/register.do'),
            method : 'post',
            data : userInfo,
            success : resolve,
            error : reject
        });
    },
    //用户登录
    checkUserLogin : function(userInfo,resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('./user/login.do'),
            method : 'post',
            data : userInfo,
            success : resolve,
            error : reject
        });
    },
    //登出
    loginOut : function(resolve,reject){
        _mm.request({
           url : _mm.getServerUrl('./user/logout.do'),
           method : 'post',
           success : resolve,
           error : reject
        });
    },
    //检查登录状态
    checkLogin : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('./user/get_user_info.do'),
            method : 'post',
            success : resolve,
            error : reject
        });
    }
};
module.exports = _user;
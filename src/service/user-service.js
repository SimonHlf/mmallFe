/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 22:43:18 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-16 22:51:53
 */
var _mm = require('util/mm.js');

var _user = {
    //登出
    loginOut : function(resolve,reject){
        _mm.request({
           url : _mm.getServerUrl('./user/loginout.do'),
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
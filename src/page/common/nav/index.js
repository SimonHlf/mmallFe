/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 22:16:37 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-28 23:43:23
 */
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-loginOut').click(function(){
            _user.loginOut(function(res){
                window.location.reload();
            },function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
           $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        },function(errMsg){
            //do nothing
        });
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
          $('.nav .cart-count').text(res || 0);
         },function(errMsg){
            $('.nav .cart-count').text(0);
         });
    }
};
module.exports = nav.init();
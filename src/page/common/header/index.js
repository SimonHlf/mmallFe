/*
 * @Author: simonHlf 
 * @Date: 2018-10-17 23:00:46 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-17 23:21:46
 */
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车后做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode == 13){
                _this.searchSubmit();
            }
        });
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在则回填
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    //搜索提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword,正常跳转到list
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            //如果keyword为空，直接返回首页
            _mm.goHome();
        }
    }
};
header.init();
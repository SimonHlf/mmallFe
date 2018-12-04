/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 17:21:36 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-26 22:29:52
 */
var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};
var _mm = {
    request : function(param){
        var _this = this;
        $.ajax({
            type : param.method || 'get',
            url : param.url || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success : function(res){
                if(res.status === 0){
                    //请求成功
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(res.status === 10){
                    //没有登录状态，需要强制登录
                    _this.doLogin();
                }else if(res.status === 1){
                    //请求数据错误      
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error : function(error){
                typeof param.error === 'function' && param.error(error.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url的参数
    getUrlParam : function(name){
        //happymmall.com/product/list?keyword=xxx&&page=1
        //keyword=xxx&&page=1
        //keyword=xxx  page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)' );
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html文件
    renderHtml : function(htmlTemplate,data){
        //一个是传入的模版 另一个是数据  帮我们传入的模版和数据拼接
        //Hogan  先编译再渲染
        var template = Hogan.compile(htmlTemplate), //第一步的编译
            result = template.render(data); //渲染
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操纵成功');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了吧~');
    },
    //字段的验证 支持非空判断 手机邮箱 
    validate : function(value,type){
        var value = $.trim(value);
        //非空验证
        if(type === 'require'){
            return !!value;
        }
        //手机号码验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if(type === 'email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回主页
    goHome : function(){
        window.location.href = './index.html';
    }

};
module.exports = _mm;
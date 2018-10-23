/*
 * @Author: simonHlf 
 * @Date: 2018-10-20 17:40:01 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-20 18:18:25
 */
//侧边导航
require('./index.css');
var _mm = require('util/mm.js');
var templateInddex = require('./index.string');
var navSide = {
    option : {
        name : '',
        navList : [
            {name : 'user-center',desc:'个人中心',href:'./user-center.html'},
            {name : 'order-list',desc:'我的订单',href:'./order-list.html'},
            {name : 'pass-update',desc:'修改密码',href:'./pass-update.html'},
            {name : 'about',desc:'关于MMall',href:'./about.html'}
        ]
    },
    init : function(option){
        //$.extend({},this.option,option)
        //合并选项
        $.extend(this.option,option);//浅拷贝
       this.renderNav();
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据
        for(var i=0,iLength = this.option.navList.length;i<iLength;i++){
            if(this.option.navList[i].name == this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        //渲染list数据
        var navHtml = _mm.renderHtml(templateInddex,{
            navList : this.option.navList
        });
        //把html放入容器
        $('.nav-side').html(navHtml);
    }
};
module.exports = navSide;
/*
 * @Author: simonHlf 
 * @Date: 2018-10-23 23:18:03 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-23 23:29:53
 */
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    $element.show();
});
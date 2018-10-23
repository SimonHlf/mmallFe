/*
 * @Author: simonHlf 
 * @Date: 2018-10-16 22:55:12 
 * @Last Modified by: simonHlf
 * @Last Modified time: 2018-10-20 08:56:25
 */
var _mm = require('util/mm.js');
var _cart = {
    getCartCount : function(resolve,reject){
        _mm.request({
            url : _mm.getServerUrl('./cart/get_cart_product_count.do'),
            success : resolve,
            error : reject
        });
    }
};
module.exports = _cart;
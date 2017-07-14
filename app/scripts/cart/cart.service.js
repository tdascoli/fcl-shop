;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('CartService', function ($http, lodash, baseUrl) {

      var order={
        name:'',
        address:'',
        email:'',
        phone:'',
        cart:[]
      };

      function isItemInCart(item){
        return lodash.findIndex(order.cart,['article_id', item.article_id]);
      }

      function toCart(item){
        var order_article = {
          article_id:item.article_id,
          title:item.title,
          prize:item.prize,
          qty:1
        };

        var itemIndex=isItemInCart(item);

        if (itemIndex===-1){
          order.cart.push(order_article);
        }
        else {
          order.cart[itemIndex].qty++;
        }
      }

      function placeOrder(){
        return $http.post(baseUrl+'/orders', order);
      }

      function emptyCart(){
        order.cart = [];
      }

      return {
        order: order,
        cart: order.cart,
        toCart: toCart,
        placeOrder: placeOrder,
        emptyCart: emptyCart
      };

    });


}());




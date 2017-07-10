;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('CartService', function (lodash) {

      var cart=[];

      function isItemInCart(item){
        return lodash.findIndex(cart,['article_id', item.article_id]);
      }

      function toCart(item){
        var order_article = {
          article_id:item.article_id,
          title:item.title,
          qty:1
        };

        var itemIndex=isItemInCart(item);

        if (itemIndex===-1){
          cart.push(order_article);
        }
        else {
          cart[itemIndex].qty++;
        }
      }

      return {
        cart: cart,
        toCart: toCart
      };

    });


}());




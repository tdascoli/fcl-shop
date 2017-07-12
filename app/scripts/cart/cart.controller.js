;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('CartCtrl', function ($scope, $state, lodash, CartService) {

      $scope.order=CartService.order;

      $scope.accounting = function(prize){
        return accounting.formatMoney(prize, { symbol: "Fr.",  format: "%v %s" }, 2, "'", ".");
      };

      $scope.addToCart=function(article){
        CartService.toCart(article);
      };

      $scope.removeFromCart=function(article){
        lodash.remove($scope.order.cart, function(n) {
          return n.article_id === article.article_id;
        });
      };

      $scope.showCartPrize=function(prize,qty){
        return $scope.accounting(qty * prize);
      };

      $scope.showTotalCartPrize=function(){
        var total=0;
        $scope.order.cart.forEach(function(item){
          total = total + (item.qty * item.prize);
        });
        return $scope.accounting(total);
      };

      $scope.placeOrder=function(){
        CartService.placeOrder().then(function (result){
          CartService.emptyCart();

          $state.go('order',{orderId: result.data});
        },function (error){
          console.error(error);
        });
      };

    });


}());




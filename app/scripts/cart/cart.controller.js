;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('CartCtrl', function ($scope, lodash, ArticleService, CartService) {

      $scope.cart=CartService.cart;
      $scope.articles=false;

      ArticleService.listArticles().then(function (result){
        $scope.articles=result.data.articles;
      },function (error){
        console.error(error);
      });

      $scope.accounting = function(prize){
        return accounting.formatMoney(prize, { symbol: "Fr.",  format: "%v %s" }, 2, "'", ".");
      };

      $scope.addToCart=function(article){
        CartService.toCart(article);
      };

      $scope.removeFromCart=function(article){
        lodash.remove($scope.cart, function(n) {
          return n.article_id === article.article_id;
        });
      };

      $scope.showCartPrize=function(prize,qty){
        return $scope.accounting(qty * prize);
      };

      $scope.showTotalCartPrize=function(){
        var total=0;
        $scope.cart.forEach(function(item){
          total = total + (item.qty * item.prize);
        });
        return $scope.accounting(total);
      };

    });


}());




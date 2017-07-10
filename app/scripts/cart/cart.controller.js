;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('CartCtrl', function ($scope, ArticleService, CartService) {

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

    });


}());




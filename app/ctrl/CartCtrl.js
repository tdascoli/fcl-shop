'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('CartCtrl', function($scope, $location, CartService){

        $scope.showTotalPrize=function(){
            var prize = 0;
            for(var i=0;i<CartService.cartQty();i++){
                prize=prize+$scope.showPrize(CartService.getCartItem(i));
            }
            return prize;
        };

        /*$scope.showPrize=function(article){
            var prize = +article.prize;
            var qty=1;
            if (article.logo_print>0){
                prize=prize+8;
            }
            if (article.order_char_print!==undefined && article.order_char_print.length>0){
                prize=prize+5;
            }
            // qty
            if (angular.isDefined(article.qty)){
                qty = article.qty;
            }
            prize=prize*qty;
            return prize;
        };*/

        $scope.showPrize=function(article){
            return CartService.showPrize(article);
        };

        $scope.showStaticPrize=function(article,currency){
            var prize = +article.prize;
            if (article.logo_print>0){
                prize=prize+8;
            }
            return currency+' '+prize;
        };

        $scope.showStaticChildrenPrize=function(article,currency){
            var childrenPrize = +article.children_prize;
            if (article.logo_print>0){
                childrenPrize=childrenPrize+8;
            }
            return currency+' '+childrenPrize;
        };

        $scope.addToCart=function(article,showDetail){
            CartService.addToCart(article);
            //$location.path('/cart');
            showDetail=false;
        };

        $scope.removeFromCart=function(article){
            CartService.removeFromCart(article);
        };

        $scope.cartQty=function(){
            return CartService.cartQty();
        };

        $scope.showCart=function(){
            return CartService.showCart();
        };
    });
}());
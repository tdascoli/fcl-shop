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

        $scope.showPrize=function(article){
            var prize = +article.prize;
            var qty=1;
            if (article.logo_print>0){
                prize=prize+8;
            }
            if (angular.isDefined(article.order_char_print_bool) && article.order_char_print_bool){
                prize=prize+8;
            }
            // qty
            if (angular.isDefined(article.qty)){
                qty = article.qty;
            }
            prize=prize*qty;
            return prize;
        };

        $scope.showStaticPrize=function(article){
            var prize = +article.prize;
            if (article.logo_print>0){
                prize=prize+8;
            }
            return prize;
        };

        $scope.addToCart=function(article){
            CartService.addToCart(article);
            $location.path('/cart');
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
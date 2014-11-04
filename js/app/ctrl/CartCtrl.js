'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('CartCtrl', function($scope, $location, CartService){

        $scope.showTotalPrize=function(){
            var prize = 0;
            for(var i=0;i<CartService.cartQty();i++){
                prize=prize+CartService.showPrize(CartService.getCartItem(i));
            }
            return accounting.toFixed(prize,2);
        };

        $scope.showPrize=function(article){
            return accounting.toFixed(CartService.showPrize(article),2);
        };

        $scope.showStaticPrize=function(article,currency){
            var prize = +article.prize;
            //console.log("init "+prize);
            if (article.discount>0){
                prize = prize-((article.discount/100) * prize);
            }
            //console.log("discount "+article.discount+"% "+prize);
            if (article.logo_print==='1'){
                prize=prize+8;
            }
            //console.log("logo "+prize);
            return currency+' '+accounting.toFixed(prize,2);
        };

        $scope.showStaticChildrenPrize=function(article,currency){
            var childrenPrize = +article.children_prize;
            if (article.discount>0){
                childrenPrize = childrenPrize*(article.discount/100);
            }
            if (article.logo_print>0){
                childrenPrize=childrenPrize+8;
            }
            return currency+' '+accounting.toFixed(childrenPrize,2);
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
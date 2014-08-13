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
        }

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
        }

        $scope.showStaticPrize=function(article){
            var prize = +article.prize;
            if (article.logo_print>0){
                prize=prize+8;
            }
            return prize;
        }

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

        $scope.test={
            "logoPrint": true,
            "charPrintBool": true,
            "size": {
                "value": "L",
                "group": "Herren"
            },
            "qty": 1,
            "charPrint": "TD",
            "article": {"article_id":"1","article_number":"123456.123","title":"Test Shorts","description":"Test Shorts from Nike for the Test Shop","prize":"30","picture":"\/images\/tmp\/short_tall.png","children_size":"1","logo_print":"1","char_print":"1"}
        };
        // beispiel
        /*
         $scope.order.orderId=1234;
         $scope.order.articles=[
         {artNumber:'123456.123',qty:1,size:'l',logoPrint:true,charPrint:"TD"},
         {artNumber:'234567.123',qty:2,size:'l',logoPrint:false,charPrint:"TD"}
         ];
         $scope.order.customer={email:'thomas@dasco.li',name:'Thomas DAscoli',phone:'0787437791',address:'Junkerngasse 1, 3011 Bern',orderDate:'10.08.2014 14:49'};
         */
    });
}());
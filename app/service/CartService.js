'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.service('CartService', function($cookieStore){
        var service={};
        service.cart;

        if (!service.cart){
            var cart = $cookieStore.get('cart');
            if (cart){
                service.cart = cart;
            }
            else {
                service.cart=[];
            }
        }

        service.cartQty=function(){
           return service.cart.length;
        };

        service.removeFromCart=function(article){
            service.cart.splice( service.cart.indexOf(article), 1 );
            service.addToCookieCart();
        };

        service.addToCart=function(article){
            service.cart.push(angular.copy(article));
            service.addToCookieCart();
        };

        service.showCart=function(){
           return service.cart;
        };

        service.getCartItem=function(i){
            return service.cart[i];
        };

        service.addToCookieCart=function(){
            $cookieStore.put('cart',service.cart);
        };

        service.emptyCart=function(){
            service.cart=[];
            service.addToCookieCart();
        };

        service.showPrize=function(article){
            var prize;
            if (article.size.group==="Herren"){
                prize = +article.prize;
            }
            else {
                prize = +article.children_prize;
            }
            if (article.discount>0){
                prize = prize*(article.discount/100);
            }

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
        };

       return service;

    });
}());
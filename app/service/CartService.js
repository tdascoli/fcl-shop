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

        //cookies....
        service.removeFromCart=function(article){
            service.cart.splice( service.cart.indexOf(article), 1 );
            service.addToCookieCart();
        };

        service.addToCart=function(article){
            service.cart.push(article);
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
        }

       return service;

    });
}());
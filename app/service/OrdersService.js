'use strict';

(function(){
    var as = angular.module($appConfig.app.name);
    var orderArticleUrl='/api/order_article';
    var orderUrl='/api/orders';

    as.service('OrdersService', function($http, CartService){
        var service={};
        service.orderData;
        service.cartData=[];

        service.prepareOrderArticle=function(order_id,order_article){
            // prepare articles for persisting in db
            var size = order_article.size.value;
            var size_type=1;
            if (order_article.size.group!=="Herren"){
                size_type=2;
            }
            order_article.size = size;
            order_article.size_type = size_type;
            order_article.order_id=order_id;
            order_article.prize=CartService.showPrize(order_article);
            return order_article;
        };

        service.getOrderData=function(order_id){
            $http.get(orderUrl+"/"+order_id).
                success(function (data, status) {
                    service.orderData = data;
                    service.getOrderArticleData(order_id);
                }).
                error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
        };

        service.getOrderArticleData=function(order_id){
            $http.get(orderArticleUrl+"/"+order_id).
                success(function (data, status) {
                    service.cartData = data;
                }).
                error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
        };

        service.putOrder=function(order,cart){
            $http.post(orderUrl, order).
                success(function (data, status) {
                    service.orderData = data;
                    for (var i=0;i<cart.length;i++){
                        service.putOrderArticle(service.prepareOrderArticle(service.orderData.order_id,cart[i]));
                    }
                }).
                error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
        };

        service.putOrderArticle=function(article){
            $http.post(orderArticleUrl, article).
                success(function (data, status) {
                    service.cartData.push(data);
                }).
                error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
        };

        service.getOrder=function(){
            if (service.orderData){
                return service.orderData;
            }
            return false;
        };

        service.getOrderArticle=function(){
            if (service.cartData){
                return service.cartData;
            }
            return false;
        };

        service.getOrderId=function(){
            return service.orderData.order_id;
        };

        return service;
    });
}());
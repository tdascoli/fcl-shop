'use strict';

(function(){
    var as = angular.module($appConfig.app.name);
    var orderArticleUrl='/api/order_article';
    var orderUrl='/api/orders';

    as.service('OrdersService', function($http, CartService){
        var service={};
        service.orderData;
        service.orderEmail={};
        service.cartData=[];

        service.prepareOrderArticle=function(order_id,order_article){
            // prepare articles for persisting in db
            var size = order_article.size.value;
            var size_type=1;
            var article_number = order_article.article_number;
            if (order_article.size.group!=="Herren"){
                size_type=2;
                article_number = order_article.article_number_children;
            }
            order_article.article_number = article_number;
            order_article.order_prize=CartService.showPrize(order_article);
            order_article.size = size;
            order_article.size_type = size_type;
            order_article.order_id=order_id;
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
            service.orderData=[];
            $http.post(orderUrl, order).
                success(function (data, status) {
                    service.orderData = data;
                    for (var i=0;i<cart.length;i++){
                        service.putOrderArticle(service.prepareOrderArticle(service.orderData.order_id,cart[i]));
                    }
                    service.sendOrder(service.orderData.order_id);
                }).
                error(function (data, status) {
                    console.log(data);
                    console.log(status);
                });
        };

        service.sendOrder=function(order_id){
            $http.get(orderUrl+"/send/"+order_id).
                success(function (data, status) {
                    service.orderEmail.sent=true;
                    service.orderEmail.msg=data;
                }).
                error(function (data, status) {
                    service.emailSent=false;
                });
        };

        service.putOrderArticle=function(article){
            service.cartData=[];
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

        service.showTotalOrderPrize=function(){
            return "Prize";
        };

        return service;
    });
}());
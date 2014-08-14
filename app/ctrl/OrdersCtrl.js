'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('OrdersCtrl', function($scope,$location,$cookieStore,CartService,OrdersService){
       $scope.order;
       $scope.orderValidation=true;
       $scope.noOrders=true;

       if (!$scope.order){
           var order = $cookieStore.get('order');
           if (order){
               $scope.order = order;
           }
           else {
               $scope.order={};
           }
       }

       $scope.justOrderIt=function(){
           if ($scope.cartQty()===0){
               $scope.noOrders=false;
           }
           else if (!angular.isString($scope.order.email) ||
               !angular.isString($scope.order.name)  ||
               !angular.isString($scope.order.phone) ||
               !angular.isString($scope.order.address) ){
               $scope.orderValidation=false;
           }
           else {
               // angaben merken
               if ($scope.order.saveAddress){
                   $scope.order.saveAddress=null;
                   $cookieStore.put('order',$scope.order);
               }
               // persist

               OrdersService.putOrder($scope.order,CartService.showCart());

               // empty cart
               CartService.emptyCart();

               $location.path('/order');
           }
       };

       $scope.getOrder=function(){
           return OrdersService.getOrder();
       };

        $scope.getOrderArticle=function(){
            return OrdersService.getOrderArticle();
        };

       $scope.getOrderId=function(){
           return OrdersService.getOrderId();
       };

    });
}());
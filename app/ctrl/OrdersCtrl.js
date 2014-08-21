'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('OrdersCtrl', function($scope,$location,$cookieStore,$routeParams,CartService,OrdersService){
       $scope.order;
       $scope.orderValidation=true;
       $scope.noOrders=true;
       $scope.savedOrder=false;


       if (!$scope.order){
            var order = $cookieStore.get('order');
            if (order){
                $scope.order = order;
            }
            else {
                $scope.order={};
            }
       }

       if ($routeParams.orderId){
           $scope.savedOrder=true;
           OrdersService.getOrderData($routeParams.orderId);
       }
       else if (!OrdersService.getOrder() && $location.path()==='/order'){
           $location.path('/');
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
               // empty cart/order
               CartService.emptyCart();
               $scope.order={};

               $location.path('/order');
           }
       };

       $scope.renderPrize=function(prize){
            return accounting.toFixed(prize,2);
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
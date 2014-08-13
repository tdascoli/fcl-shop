'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('OrdersCtrl', function($scope,$location,$cookieStore){
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
               if ($scope.order.saveAddress){
                   $scope.order.saveAddress=null;
                   $cookieStore.put('order',$scope.order);
               }
               $location.path('/order');
           }
       };
    });
}());
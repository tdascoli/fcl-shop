;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('OrderService', function ($http, AdminService) {

      function getOrder(orderId){
        return $http.get('http://localhost:3010/orders/'+orderId);
      }

      function listOrders(){
        return $http.get('http://localhost:3010/orders');
      }

      function orderCompleted(orderId){
        return $http.put('http://localhost:3010/orders/completed/'+orderId+AdminService.addToken(),{'completed':true});
      }

      function deleteOrder(orderId){
        return $http.delete('http://localhost:3010/orders/'+orderId+AdminService.addToken());
      }

      return {
        getOrder: getOrder,
        listOrders: listOrders,
        deleteOrder: deleteOrder,
        orderCompleted: orderCompleted
      };

    });


}());




;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('OrderService', function ($http, baseUrl, AdminService) {

      function getOrder(orderId){
        return $http.get(baseUrl+'/orders/'+orderId);
      }

      function listOrders(){
        return $http.get(baseUrl+'/orders');
      }

      function orderCompleted(orderId){
        return $http.put(baseUrl+'/orders/completed/'+orderId+AdminService.addToken(),{'completed':true});
      }

      function deleteOrder(orderId){
        return $http.delete(baseUrl+'/orders/'+orderId+AdminService.addToken());
      }

      return {
        getOrder: getOrder,
        listOrders: listOrders,
        deleteOrder: deleteOrder,
        orderCompleted: orderCompleted
      };

    });


}());




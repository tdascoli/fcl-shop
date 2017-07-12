;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('OrderService', function ($http) {

      function getOrder(orderId){
        return $http.get('http://localhost:3010/orders/'+orderId);
      }

      return {
        getOrder: getOrder
      };

    });


}());




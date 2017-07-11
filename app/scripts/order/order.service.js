;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('OrderService', function ($http) {

      var order={
        name:'',
        address:'',
        email:'',
        phone:'',
        order_date:'',
        cart:[]
      };

      function placeOrder(order){
        $http.post('http://localhost:3010/articles', order).then(function (result){
          console.log(result);
        },function (error){
          console.error(error);
        });
      }

      return {
        order: order,
        placeOrder: placeOrder
      };

    });


}());




;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('OrderService', function () {

      var order={
        name:'',
        address:'',
        email:'',
        phone:'',
        order_date:'',
        cart:[]
      };

      return {
        order: order
      };

    });


}());




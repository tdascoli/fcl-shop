;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('OrderCtrl', function ($scope, OrderService) {

      $scope.order=OrderService.order;

    });


}());




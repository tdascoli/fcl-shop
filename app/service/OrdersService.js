'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.service('OrdersService', function($scope){
       $scope.order={};

    });
}());
;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('AuthCtrl', function ($scope, $cookies, $state, AdminService) {

      $scope.credentials={};
      $scope.error=false;

      $scope.login=function(){
        $scope.error=false;
        AdminService.login($scope.credentials).then(function(auth){
          if (auth){
            $cookies.put('authenticate', md5($scope.credentials.user+$scope.credentials.password));
            $state.go('admin/main');
          }
          else {
            $scope.credentials.password='';
            $scope.error=true;
          }
        });
      };

    });


}());




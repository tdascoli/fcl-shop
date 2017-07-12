;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('AdminService', function ($http, $q) {

      var token={};

      function login(credentials){
        credentials.password=md5(credentials.password);

        return $q(function(resolve){
          $http.post('http://localhost:3010/authenticate',credentials).then(function (result){
            if (!result.data){
              resolve(false);
            }
            else {
              token=result.data;
              resolve(true);
            }
          },function (){
            resolve(false);
          });
        });
      }

      function authenticate(authToken){
        return token['token']===authToken;
      }

      return {
        login: login,
        authenticate: authenticate
      };

    });


}());




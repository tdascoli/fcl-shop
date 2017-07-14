;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('AdminService', function ($http, $q, baseUrl) {

      var token={};

      function login(credentials){
        credentials.password=md5(credentials.password);

        return $q(function(resolve){
          $http.post(baseUrl+'/authenticate',credentials).then(function (result){

            console.log(result);

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
        return token.token===authToken;
      }

      function addToken(){
        return '?token='+token.token+'&uid='+token.uid.admin_id;
      }

      return {
        login: login,
        authenticate: authenticate,
        addToken: addToken
      };

    });


}());




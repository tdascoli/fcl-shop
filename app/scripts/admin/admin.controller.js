;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('AdminCtrl', function ($scope, authenticate, article, ArticleService) {

      $scope.test=authenticate;

      $scope.article=article;
      $scope.articles=false;

      $scope.save=function(){
        ArticleService.saveArticle($scope.article).then(function (result){
          console.log(result);
        },function (error){
          console.error(error);
        });
      };

      $scope.delete=function(articleId){
        ArticleService.deleteArticle(articleId).then(function (result){
          console.log(result);
        },function (error){
          console.error(error);
        });
      };

    });


}());




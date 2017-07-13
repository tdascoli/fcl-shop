;(function () {

  'use strict';

  angular.module('shopApp')
    .controller('AdminCtrl', function ($scope, $state, authenticate, article, ArticleService) {

      $scope.test=authenticate;

      $scope.article=article;
      $scope.articles=false;

      $scope.save=function(){
        ArticleService.saveArticle($scope.article).then(function (result){
          $state.go('admin/main');
        },function (error){
          console.error(error);
        });
      };

      $scope.delete=function(articleId){
        ArticleService.deleteArticle(articleId).then(function (result){
          $state.go('admin/main');
        },function (error){
          console.error(error);
        });
      };

    });


}());




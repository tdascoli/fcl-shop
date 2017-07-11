;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('ArticleService', function ($http) {

      function listArticles(){
        return $http.get('http://localhost:3010/articles');
      }

      function getArticle(articleId){
        return $http.get('http://localhost:3010/articles/'+articleId);
      }

      return {
        listArticles: listArticles,
        getArticle: getArticle
      };

    });


}());




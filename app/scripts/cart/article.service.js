;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('ArticleService', function ($http) {

      function listArticles(){
        return $http.get('http://localhost:3010/api.php/articles?transform=1');
      }

      function getArticle(articleId){
        return $http.get('http://localhost:3010/api.php/articles/'+articleId);
      }

      return {
        listArticles: listArticles,
        getArticle: getArticle
      };

    });


}());




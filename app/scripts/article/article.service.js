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

      function saveArticle(article){
        if (article.article_id!==undefined){
          return $http.put('http://localhost:3010/articles/'+article.article_id, article);
        }
        else {
          return $http.post('http://localhost:3010/articles', article);
        }
      }

      function deleteArticle(articleId){
        return $http.delete('http://localhost:3010/articles/'+articleId);
      }

      return {
        listArticles: listArticles,
        getArticle: getArticle,
        saveArticle: saveArticle,
        deleteArticle: deleteArticle
      };

    });


}());




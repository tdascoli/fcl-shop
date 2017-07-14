;(function () {

  'use strict';

  angular.module('shopApp')
    .factory('ArticleService', function ($http, baseUrl) {

      function listArticles(){
        return $http.get(baseUrl+'/articles');
      }

      function getArticle(articleId){
        return $http.get(baseUrl+'/articles/'+articleId);
      }

      function saveArticle(article){
        if (article.article_id!==undefined){
          return $http.put(baseUrl+'/articles/'+article.article_id, article);
        }
        else {
          return $http.post(baseUrl+'/articles', article);
        }
      }

      function deleteArticle(articleId){
        return $http.delete(baseUrl+'/articles/'+articleId);
      }

      return {
        listArticles: listArticles,
        getArticle: getArticle,
        saveArticle: saveArticle,
        deleteArticle: deleteArticle
      };

    });


}());




'use strict';

(function(){
    var as = angular.module($appConfig.app.name);
    var articleUrl='/api/articles';

    as.service('ArticlesService', function ($http) {

        var service={};
        service.data;

        service.getArticles=function(success, error){
            $http({method:'get', url:articleUrl}).
                success(success).
                error(error);
        };

        service.getArticle=function(article_id, success, error){
            $http({method:'get', url:articleUrl+"/"+article_id}).
                success(success).
                error(error);
        };

        service.getArticleDetail=function(articleIds, success, error){
            for (var i=0;i<articleIds.length;i++){
                $http({method:'get', url:articleIds[i].xlink}).
                    success(success).
                    error(error);
            }
        };

        service.putArticle=function(article, success, error){
            $http.post(articleUrl, article).
                success(success).
                error(error);
        };

        service.updateArticle=function(article, success, error){
            $http.put(articleUrl+"/"+article.article_id, article).
                success(success).
                error(error);
        };

        service.deleteArticle=function(article_id, success, error){
            $http.delete(articleUrl+"/"+article_id).
                success(success).
                error(error);
        };

        return service;
    });
}());
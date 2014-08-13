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

        service.getArticleDetail=function(articleIds, success, error){
            for (var i=0;i<articleIds.length;i++){
                $http({method:'get', url:articleIds[i].xlink}).
                    success(success).
                    error(error);
            }
        };

        return service;
    });
}());
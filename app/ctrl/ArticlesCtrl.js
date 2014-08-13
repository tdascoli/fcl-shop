'use strict';

(function () {
    var as = angular.module($appConfig.app.name);

    as.controller('ArticlesCtrl', function ($scope, ArticlesService) {
        var listSuccess = function (data, status) {
            ArticlesService.data = data;
            $scope.articlesData = ArticlesService.data;
        };

        var listError = function (data, status) {
            console.log(data);
            console.log(status);
        };

        if (angular.isUndefined(ArticlesService.data)) {
            ArticlesService.getArticles(listSuccess, listError);
        }
        else {
            $scope.articlesData = ArticlesService.data;
        }

    });
}());
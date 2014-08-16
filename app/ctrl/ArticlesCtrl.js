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

        $scope.getArticleSize=function(article){

            if (article.size_type==='1') {
                // size_type===1 default Herren & Kinder
                return $scope.size;
            }
            // nur Erwachsenen Grösse
            else if (article.size_type==='2'){
                return $scope.menSize;
            }
            // Stulpen
            else if (article.size_type==='3'){
                return $scope.stulpenSize;
            }
        }

        $scope.size=[
            {value:'Herren / S',group:'Herren'},
            {value:'Herren / M',group:'Herren'},
            {value:'Herren / L',group:'Herren'},
            {value:'Herren / XL',group:'Herren'},
            {value:'Herren / XXL',group:'Herren'},
            {value:'Kinder / XS',group:'Kinder'},
            {value:'Kinder / S',group:'Kinder'},
            {value:'Kinder / M',group:'Kinder'},
            {value:'Kinder / L',group:'Kinder'},
            {value:'Kinder / XL',group:'Kinder'}
        ];

        $scope.menSize=[
            {value:'Herren / S',group:'Herren'},
            {value:'Herren / M',group:'Herren'},
            {value:'Herren / L',group:'Herren'},
            {value:'Herren / XL',group:'Herren'},
            {value:'Herren / XXL',group:'Herren'}
        ];

        $scope.stulpenSize=[
            {value:'Senior / L',group:'Herren'},
            {value:'Junior / S',group:'Kinder'}
        ];

    });
}());
'use strict';

(function () {
    var as = angular.module($appConfig.app.name);

    var url = '/server/';

    as.controller('ArticlesCtrl', function ($scope, ArticlesService) {

        $scope.article={};
        $scope.adminMsg=[];

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
            {value:'Senior / L'},
            {value:'Junior / S'}
        ];

        var success = function (data, status) {
            $scope.adminMsg.push({severity:'info',msg:'Der Artikel wurde erfolgreich abgespeichert.'});
        };

        var error = function (data, status) {
            $scope.adminMsg.push({severity:'danger',msg:'Der Artikel konnte nicht gespeichert werden.'});
        };

        var delSuccess = function (data, status) {
            $scope.adminMsg.push({severity:'info',msg:'Der Artikel wurde erfolgreich gelöscht.'});
        };

        var delError = function (data, status) {
            $scope.adminMsg.push({severity:'danger',msg:'Der Artikel konnte nicht gelöscht werden.'});
        };

        $scope.putArticle=function(){
            $scope.adminMsg=[];
            $scope.article.size_type=1;
            if ($scope.article.define_stulpen_size){
                $scope.article.size_type=3;
            }
            else if (!$scope.article.define_children_size){
                $scope.article.size_type=2;
            }
            $scope.article.picture="test.png";
            ArticlesService.putArticle($scope.article,success,error);
        };

        $scope.updateArticle=function(article_id){
            $scope.adminMsg=[];

            /*
            $scope.article.size_type=1;
            if ($scope.article.define_stulpen_size){
                $scope.article.size_type=3;
            }
            else if (!$scope.article.define_children_size){
                $scope.article.size_type=2;
            }

            ArticlesService.updateArticle($scope.article,listSuccess,listError);
            */
        };

        $scope.deleteArticle=function(article_id){
            $scope.adminMsg=[];

            // sind sie sicher...

            ArticlesService.deleteArticle(article_id,delSuccess,delError);
            ArticlesService.getArticles(listSuccess, listError);
        };

        $scope.cancel=function(){
            $scope.article={};
            $location.path('/admin');
        };

    });

    // file upload
    as.controller('FileUploadController', [
        '$scope', '$http', '$filter', '$window',
        function ($scope, $http) {
            $scope.options = {
                url: url
            };
            $scope.loadingFiles = true;
            $http.get(url)
                .then(
                function (response) {
                    $scope.loadingFiles = false;
                    $scope.queue = response.data.files || [];
                },
                function () {
                    $scope.loadingFiles = false;
                }
            );
        }
    ]);

    as.controller('FileDestroyController', [
        '$scope', '$http',
        function ($scope, $http) {
            var file = $scope.file,
                state;
            if (file.url) {
                file.$state = function () {
                    return state;
                };
                file.$destroy = function () {
                    state = 'pending';
                    return $http({
                        url: file.deleteUrl,
                        method: file.deleteType
                    }).then(
                        function () {
                            state = 'resolved';
                            $scope.clear(file);
                        },
                        function () {
                            state = 'rejected';
                        }
                    );
                };
            } else if (!file.$cancel && !file._index) {
                file.$cancel = function () {
                    $scope.clear(file);
                };
            }
        }
    ]);
}());
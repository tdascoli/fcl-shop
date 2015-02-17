'use strict';

(function () {
    var as = angular.module($appConfig.app.name);

    var url = '/articles/';

    as.controller('ArticlesCtrl', function ($scope, $location, $routeParams, ArticlesService) {

        $scope.article={
            article_number: "",
            article_number_children: "",
            title: "",
            description: "",
            prize: 0,
            children_prize: 0,
            picture: "",
            size_type: 1,
            logo_print: false,
            char_print: false
        };

        $scope.adminMsg=[];
        $scope.update=false;

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

        $scope.getInitArticleSize=function(article){
            if (article.size_type==='1') {
                // size_type===1 default Herren & Kinder
                return {value:'Herren / S',group:'Herren'};
            }
            // nur Erwachsenen Grösse
            else if (article.size_type==='2'){
                return {value:'Herren / S',group:'Herren'};
            }
            // Stulpen
            else if (article.size_type==='3'){
                return {value:'Junior / S',group:'Herren'};
            }
        };

        $scope.getArticleSize=function(article){

            if (article.size_type==='1') {
                // size_type===1 default Herren & Kinder
                return [{group:"Herren", size:[
                            {value:'Herren / S',group:'Herren'},
                            {value:'Herren / M',group:'Herren'},
                            {value:'Herren / L',group:'Herren'},
                            {value:'Herren / XL',group:'Herren'},
                            {value:'Herren / XXL',group:'Herren'}
                        ]},
                        {group:"Kinder", size:[
                            {value:'Kinder / XS',group:'Kinder'},
                            {value:'Kinder / S',group:'Kinder'},
                            {value:'Kinder / M',group:'Kinder'},
                            {value:'Kinder / L',group:'Kinder'},
                            {value:'Kinder / XL',group:'Kinder'}
                        ]}];
            }
            // nur Erwachsenen Grösse
            else if (article.size_type==='2'){
                return [{group:"Herren", size:[
                    {value:'Herren / S',group:'Herren'},
                    {value:'Herren / M',group:'Herren'},
                    {value:'Herren / L',group:'Herren'},
                    {value:'Herren / XL',group:'Herren'},
                    {value:'Herren / XXL',group:'Herren'}
                ]}];
            }
            // Stulpen
            else if (article.size_type==='3'){
                return [{group:"Stulpen",size:[
                    {value:'Senior / L',group:'Herren'},
                    {value:'Junior / S',group:'Herren'}
                ]}];
            }
        };

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

        var success = function (data, status) {
            $scope.adminMsg.push({severity:'info',msg:'Der Artikel wurde erfolgreich abgespeichert.'});
        };

        var error = function (data, status) {
            $scope.adminMsg.push({severity:'danger',msg:'Der Artikel konnte nicht gespeichert werden.'});
        };

        var editSuccess = function (data, status) {
            $scope.article=data;
            if ($scope.article.size_type==='1') {
                $scope.article.define_size=true;
                $scope.article.define_children_size=true;
            }
            // nur Erwachsenen Grösse
            else if ($scope.article.size_type==='2'){
                $scope.article.define_size=true;
            }
            // Stulpen
            else if ($scope.article.size_type==='3'){
                $scope.article.define_stulpen_size=true;
            }

            if ($scope.article.logo_print==="1"){
                $scope.article.logo_print=true;
            }
            else {
                $scope.article.logo_print=false;
            }
            if ($scope.article.char_print==="1"){
                $scope.article.char_print=true;
            }
            else {
                $scope.article.char_print=false;
            }
        };

        var editError = function (data, status) {
            $scope.adminMsg.push({severity:'danger',msg:'Der Artikel kann nicht editiert werden.'});
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

        $scope.updateArticle=function(){
            $scope.adminMsg=[];

            $scope.article.size_type=1;
            if ($scope.article.define_stulpen_size){
                $scope.article.size_type=3;
            }
            else if (!$scope.article.define_children_size){
                $scope.article.size_type=2;
            }
            ArticlesService.updateArticle($scope.article,success,error);
            ArticlesService.getArticles(listSuccess, listError);
            $location.path('/admin');
        };

        $scope.deleteArticle=function(article_id){
            $scope.adminMsg=[];

            // sind sie sicher...

            ArticlesService.deleteArticle(article_id,delSuccess,delError);
            ArticlesService.getArticles(listSuccess, listError);
        };

        $scope.choosePicture=function(picture){
            $scope.article.picture=picture.url;
        };

        $scope.cancel=function(){
            $scope.article={};
            $location.path('/admin');
        };

        if ($routeParams.articleId){
            $scope.update=true;
            ArticlesService.getArticle($routeParams.articleId, editSuccess, editError);
        }

    });

    // file upload
    as.controller('ShopFileUploadController', [
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
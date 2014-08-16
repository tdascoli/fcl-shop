'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('MainCtrl', function($scope){

        $scope.getSize=function(article){
            console.log(article.size_type);
            // nur Erwachsenen Grösse
            if (article.size_type===2){
                return $scope.menSize;
            }
            // Stulpen
            else if (article.size_type===3){
                return $scope.stulpenSize;
            }
            // size_type===1 default Herren & Kinder
            return $scope.size;
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
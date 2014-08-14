'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('MainCtrl', function($scope){
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
    });
}());
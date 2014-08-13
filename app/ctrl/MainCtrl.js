'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    as.controller('MainCtrl', function($scope){
        $scope.size=[
            {value:'S',group:'Herren'},
            {value:'M',group:'Herren'},
            {value:'L',group:'Herren'},
            {value:'XL',group:'Herren'},
            {value:'XXL',group:'Herren'},
            {value:'XS',group:'Kinder'},
            {value:'S',group:'Kinder'},
            {value:'M',group:'Kinder'},
            {value:'L',group:'Kinder'},
            {value:'XL',group:'Kinder'}
        ];

        $scope.menSize=[
            {value:'S',group:'Herren'},
            {value:'M',group:'Herren'},
            {value:'L',group:'Herren'},
            {value:'XL',group:'Herren'},
            {value:'XXL',group:'Herren'}
        ];
    });
}());
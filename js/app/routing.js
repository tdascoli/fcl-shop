'use strict';

(function(){
    var as=angular.module($appConfig.app.name);
    as.config(function($routeProvider){
    var model = [
        {
            id: "root",
            text: "Startseite",
            location: "/",
            templateUrl: "/pages/common/welcome.html",
            controller:"ArticlesCtrl",
            children: [
                {id:"agb",  text:"Abholungs und Zahlungsbedingungen", location:"/agb", templateUrl:"/pages/common/agb.html"}
            ]
        }
    ];

    $routeProvider.when('/', {templateUrl: '/pages/common/welcome.html', controller:"ArticlesCtrl"});
    $routeProvider.when('/agb', {templateUrl: '/pages/common/agb.html'});
    $routeProvider.when('/cart', {templateUrl: '/pages/common/cart.html', controller:"ArticlesCtrl"});
    $routeProvider.when('/order', {templateUrl: '/pages/common/order.html', controller:"OrdersCtrl"});
    $routeProvider.when('/order/:orderId', {templateUrl: '/pages/common/order.html', controller:"OrdersCtrl"});


    $routeProvider.when('/admin', {templateUrl: '/pages/admin/admin.html', controller:"ArticlesCtrl"});
    $routeProvider.when('/admin/edit', {templateUrl: '/pages/admin/edit.html', controller:"ArticlesCtrl"});
    $routeProvider.when('/admin/edit/:articleId', {templateUrl: '/pages/admin/edit.html', controller:"ArticlesCtrl"});
    /** 404 **/
    $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    new RoutingConfigurator().configure(model,$routeProvider);

});

}());
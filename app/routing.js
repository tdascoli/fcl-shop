'use strict';

(function(){
    var as=angular.module($appConfig.app.name);
    as.config(function($routeProvider,NavigationServiceProvider){
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
    /** 404 **/
    $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    new RoutingConfigurator().configure(model,$routeProvider);

});

}());
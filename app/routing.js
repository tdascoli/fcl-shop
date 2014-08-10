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
            children: [
                {id:"products", text:"Produkte", location:"/products", templateUrl:"/pages/common/products.html",
                children: [
                    {id:"item", text:"Item", location:"/item", templateUrl:"/pages/common/item.html"}
                ]},
                {id:"agb",  text:"Abholungs und Zahlungsbedingungen", location:"/agb",   templateUrl:"/pages/common/agb.html"}
            ]
        }
    ];

    NavigationServiceProvider.setModel(model);

    /** cart **/
    $routeProvider.when('/cart', {templateUrl: '/pages/common/cart.html'});
    /** 404 **/
    $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    new RoutingConfigurator().configure(model,$routeProvider);

});

}());
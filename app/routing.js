/**
 * Created with IntelliJ IDEA.
 * User: TYWQB
 * Date: 03.03.14
 * Time: 11:21
 * To change this template use File | Settings | File Templates.
 */
'use strict';

(function(){
    var as=angular.module($appConfig.app.name);
    as.config(function($routeProvider,NavigationServiceProvider){
    var model = [];
    model = [
            {id:"root",             text:"Home",                location:"/",                   templateUrl:"/pages/common/welcome.html"},
            {id:"login",            text:"Login, what else?",   location:"/login",              templateUrl:"/pages/common/login.html"},
            {id:"cart",             text:"Warenkorb",           location:"/cart",               templateUrl:"/pages/common/cart.html"}
            ];

    NavigationServiceProvider.setModel(model);
    for(var i=0;i<model.length;i++){
        if (!model[i].controller){
            $routeProvider.when(model[i].location, {templateUrl: model[i].templateUrl});
        }
        else {
            $routeProvider.when(model[i].location, {controller: model[i].controller, templateUrl: model[i].templateUrl});
        }
    }
       /** routing
       $routeProvider.when('/', {templateUrl: '/pages/common/welcome.html'});
       $routeProvider.when('/login', {templateUrl: '/pages/common/login.html'});

       /** 404 **/
       $routeProvider.otherwise({templateUrl: '/pages/common/404.html'});
    });
}());
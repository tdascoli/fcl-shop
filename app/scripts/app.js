;(function () {
  'use strict';

/**
 * @ngdoc overview
 * @name fclShopApp
 * @description
 * # fclShopApp
 *
 * Main module of the application.
 */
var app = angular.module('shopApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngLodash',
    'ui.router'
  ]);


  app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      views: {
        cart: {
          templateUrl: 'views/cart.html',
          controller: 'CartCtrl'
        },
        content: {
          templateUrl: 'views/main.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('checkout', {
      url: '/checkout',
      views: {
        content: {
          templateUrl: 'views/checkout.html',
          controller: 'CartCtrl'
        }
      }
    });

}]);

}());

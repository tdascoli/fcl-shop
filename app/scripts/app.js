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
          templateUrl: 'views/main/cart.html',
          controller: 'CartCtrl'
        },
        content: {
          templateUrl: 'views/main/main.html',
          controller: 'ArticleCtrl'
        }
      }
    })
    .state('checkout', {
      url: '/checkout',
      views: {
        content: {
          templateUrl: 'views/checkout/checkout.html',
          controller: 'CartCtrl'
        }
      }
    })
    .state('order', {
      url: '/order',
      views: {
        content: {
          templateUrl: 'views/order/order.html',
          controller: 'OrderCtrl'
        }
      }
    });

}]);

}());

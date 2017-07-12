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
      url: '/order/{orderId}',
      views: {
        content: {
          templateUrl: 'views/order/order.html',
          controller: 'OrderCtrl'
        }
      },
      resolve: {
        order: function ($state, $stateParams, OrderService) {
          if ($stateParams.orderId !== undefined) {
            return OrderService.getOrder($stateParams.orderId).then(function (result){
              if (result.data.cart.length>0){
                return result.data;
              }
              else {
                $state.go('home');
              }
            },function (error){
              console.error(error);
              $state.go('home');
            });
          }
          else {
            $state.go('home');
          }
        }
      }
    })
    .state('admin', {
      url: '/admin',
      views: {
        content: {
          templateUrl: 'views/admin/login.html',
          controller: 'AuthCtrl'
        }
      }
    })
    .state('admin/main', {
      url: '/admin/main',
      views: {
        cart: {
          templateUrl: 'views/admin/articles.html',
          controller: 'ArticleCtrl'
        },
        content: {
          templateUrl: 'views/admin/main.html',
          controller: 'AdminCtrl'
        }
      },
      resolve: {
        authenticate: function ($state, $cookies, AdminService) {
          //if ($cookies.get('authenticate')!==undefined && AdminService.authenticate($cookies.get('authenticate'))) {
          if (1===1){
            return 'auth ok';
          }
          else {
            $state.go('admin');
          }
        },
        article: function(){
          return {};
        }
      }
    })
    .state('admin/edit', {
      url: '/admin/edit/{articleId}',
      views: {
        cart: {
          templateUrl: 'views/admin/articles.html',
          controller: 'ArticleCtrl'
        },
        content: {
          templateUrl: 'views/admin/main.html',
          controller: 'AdminCtrl'
        }
      },
      resolve: {
        authenticate: function ($state, $cookies, AdminService) {
          //if ($cookies.get('authenticate')!==undefined && AdminService.authenticate($cookies.get('authenticate'))) {
          if (1===1){
            return 'auth ok';
          }
          else {
            $state.go('admin');
          }
        },
        article: function($state, $stateParams, ArticleService){
          if ($stateParams.articleId !== undefined) {
            return ArticleService.getArticle($stateParams.articleId).then(function (result){
              return result.data;
            });
          }
          else {
            return {};
          }
        }
      }
    });

}]);

}());

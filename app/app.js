'use strict';

(function(){
    var as = angular.module($appConfig.app.name, ['ngRoute', 'ngCookies', 'alv-ch-ng.i18n', 'alv-ch-ng.ui-forms', 'alv-ch-ng.ui-navigation', 'alv-ch-ng.ui', 'alv-ch-ng.security']);

    as.config(function($routeProvider,$httpProvider){
       $httpProvider.defaults.headers.useXDomain=true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

    as.config(function(I18nPropertyServiceProvider) {
        I18nPropertyServiceProvider.setFilePath('i18n/');
        I18nPropertyServiceProvider.setDefaultLanguage('de');
        I18nPropertyServiceProvider.setSupportedLanguages(['de']);
        I18nPropertyServiceProvider.setMarkUnresolvedProperties(false);
    });

    as.config(function(UiConfigServiceProvider) {
        UiConfigServiceProvider.setConfig({
            labelWidth:3,
            commonSubmit:'Submit',
            commonCancel:'Cancel',
            titleSelect:'testPleaseChoose',
            gridDefaultDevice:'md'
        })
    });

    as.run(function($rootScope, $http, $window){

    });
}());
'use strict';

(function(){
    var as = angular.module($appConfig.app.name, ['ngRoute', 'ngCookies', 'alv-ch-ng.i18n', 'alv-ch-ng.ui-forms', 'alv-ch-ng.ui-navigation', 'alv-ch-ng.ui-core', 'alv-ch-ng.security', 'blueimp.fileupload','ngTextTruncate']);

    as.config(function($routeProvider,$httpProvider){
       $httpProvider.defaults.headers.useXDomain=true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

    as.config(function(I18nPropertyServiceProvider) {
        I18nPropertyServiceProvider.setFilePath('/i18n/');
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

    as.config(function($routeProvider,$httpProvider,fileUploadProvider){
        $httpProvider.defaults.headers.useXDomain=true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        fileUploadProvider.defaults.redirect = window.location.href.replace(
            /\/[^\/]*$/,
            '/images/?%s'
        );

        // FileUpload Demo settings:
        angular.extend(fileUploadProvider.defaults, {
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            //disableImageResize: /Android(?!.*Chrome)|Opera/
            //    .test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
    });

    as.run(function($rootScope, $http, $window){

    });
}());
'use strict';

(function(){
    var as = angular.module($appConfig.app.name, ['ngRoute', 'alv-ch-ng.i18n', 'alv-ch-ng.ui', 'alv-ch-ng.security', 'blueimp.fileupload','ui.bootstrap.typeahead','nya.bootstrap.select']);


    as.config(function($routeProvider,$httpProvider,fileUploadProvider){
       $httpProvider.defaults.headers.useXDomain=true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        fileUploadProvider.defaults.redirect = window.location.href.replace(
            /\/[^\/]*$/,
            '/upload/?%s'
        );

        // FileUpload Demo settings:
        angular.extend(fileUploadProvider.defaults, {
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 5000000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
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
/**
 * Created with IntelliJ IDEA.
 * User: TYWQB
 * Date: 03.03.14
 * Time: 11:19
 * To change this template use File | Settings | File Templates.
 */
'use strict';

(function(){
    var as = angular.module($appConfig.app.name);

    var url = '/server/php/';

    as.controller('MainCtrl', function($scope){
       $scope.title="ng-shop";

       $scope.common={};

       $scope.size=['xs','s','m','l','xl','xxl'];
       $scope.common.size=['xs','s','m','l','xl','xxl'];
       $scope.common.childrenSize=['xs','s','m','l','xl','xxl'];

    });

    // file upload
    as.controller('DemoFileUploadController', [
        '$scope', '$http', '$filter', '$window',
        function ($scope, $http) {
            $scope.options = {
                url: url
            };
            $scope.loadingFiles = true;
            $http.get(url)
                .then(
                function (response) {
                    $scope.loadingFiles = false;
                    $scope.queue = response.data.files || [];
                },
                function () {
                    $scope.loadingFiles = false;
                }
            );
        }
    ]);

    as.controller('FileDestroyController', [
            '$scope', '$http',
            function ($scope, $http) {
                var file = $scope.file,
                    state;
                if (file.url) {
                    file.$state = function () {
                        return state;
                    };
                    file.$destroy = function () {
                        state = 'pending';
                        return $http({
                            url: file.deleteUrl,
                            method: file.deleteType
                        }).then(
                            function () {
                                state = 'resolved';
                                $scope.clear(file);
                            },
                            function () {
                                state = 'rejected';
                            }
                        );
                    };
                } else if (!file.$cancel && !file._index) {
                    file.$cancel = function () {
                        $scope.clear(file);
                    };
                }
            }
        ]);
}());
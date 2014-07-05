;(function(){

    'use strict';

    var module = angular.module('alv-ch-ng.ui');

    module.provider('NavigationService', function () {
        var _model = [];
        var _currentItem = null;
        var _breadCrumbs = [];

        function setModel(model) {
            checkModelAndSetParentRelation(model);

            _model = model;
            _currentItem = _model[0];
        }

        function checkModelAndSetParentRelation(model) {
            var throwError = function() {
                throw 'Illegal model to set.';
            };

            if (!model) {
                throwError();
            }

            if (angular.isArray(model)) {
                if (model.length === 0) {
                    throwError();
                }
                for (var i = 0; i < model.length; i++) {
                    var item = model[i];
                    if (!item || !item.id) {
                        throwError();
                    }
                    if (item.children && item.children.length > 0) {
                        for (var j = 0; j < item.children.length; j++) {
                            item.children[j].parent = item;
                        }
                    }
                }
                _model = model;
            }  else {
                throwError();
            }
        }

        function getModel() {
            return _model;
        }

        function getCurrentItem() {
            return _currentItem;
        }

        function setCurrentItem(item) {
            if (!item) {
                throw 'item must not be null.';
            } else if (!item.id) {
                throw 'param item must provide an id attribute.';
            }
            _currentItem = item;
            _breadCrumbs = createBreadCrumbsRecursively(item, []);
        }

        function getBreadCrumbs() {
            return _breadCrumbs;
        }

        function createBreadCrumbsRecursively(item, path) {
            path.unshift(item);
            if (item.parent) {
                return createBreadCrumbsRecursively(item.parent, path);
            }
            return path;
        }

        function isCurrentItem(item) {
            return areItemsEqual(item, _currentItem);
        }

        function areItemsEqual(item1, item2) {
            return compareItems(item1, item2) === 0;
        }

        function compareItems(item1, item2) {
            if (item1.id === item2.id) {
                return 0;
            }
            if (item1.id > item2.id) {
                return 1;
            }
            return -1;
        }

        function isOnCurrentPath(item) {
            if (!item) {
                return false;
            }
            for (var i = 0; i < _breadCrumbs.length; i++ ) {
                if (areItemsEqual(item, _breadCrumbs[i])) {
                    return true;
                }
            }
            return false;
        }

        function isChildOfCurrent(item) {
            if (!item) {
                return false;
            }
            for (var i = 0; i < _currentItem.children.length; i++) {
                if (areItemsEqual(item, _currentItem.children[i])) {
                    return true;
                }
            }
            return false;
        }

        return {
            setModel: setModel,
            getModel: getModel,
            $get: function() {
                return {
                    getTopLevelItems: getModel,
                    getBreadCrumbs: getBreadCrumbs,
                    getCurrentItem: getCurrentItem,
                    setCurrentItem: setCurrentItem,
                    isCurrentItem: isCurrentItem,
                    isOnCurrentPath: isOnCurrentPath,
                    isChildOfCurrent: isChildOfCurrent
                };
            }
        };
    });

    module.directive('mainNavigation', ['NavigationService', function(NavigationService){
        return {
            restrict: 'E',
            template: '<div></div>',
            replace: true,
            link: function(scope){
                scope.getTopLevelItems = NavigationService.getTopLevelItems;
                scope.getBreadCrumbs = NavigationService.getBreadCrumbs;
                scope.getCurrentItem = NavigationService.getCurrentItem;
                scope.setCurrentItem = NavigationService.setCurrentItem;
                scope.isCurrentItem = NavigationService.isCurrentItem;
                scope.isOnCurrentPath = NavigationService.isOnCurrentPath;
                scope.isChildOfCurrent = NavigationService.isChildOfCurrent;
            }
        };
    }]);

}());
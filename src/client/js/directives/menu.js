angular.module("ryso").directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/menu.ng.html',
        replace: true,
        transclude: true,
        controller: 'MenuController',
        scope: {
            // scope attribues
        }
    }
});
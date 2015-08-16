angular.module("ryso").directive('ordersOverview', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/ordersOverview.ng.html',
        replace: true,
        transclude: true,
        controller: 'OrdersOverviewController',
        scope: {
            // scope attributes
        }
    }
});
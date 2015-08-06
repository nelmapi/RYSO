angular.module("ryso").directive('orderList', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/orderList.ng.html',
        replace: true,
        transclude: true,
        controller: 'OrderListController',
        scope: {
            // parameters
        }
    }
});
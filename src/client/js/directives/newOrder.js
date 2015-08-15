angular.module("ryso").directive('newOrder', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/newOrder.ng.html',
        replace: true,
        transclude: true,
        controller: 'NewOrderController',
        scope: {
            newOrder: '=',
            lineItems: '='
        }
    }
});

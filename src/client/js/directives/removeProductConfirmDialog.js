angular.module("ryso").directive('removeProductConfirmDialog', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/removeProductConfirmDialog.ng.html',
        replace: true,
        transclude: true,
        controller: 'RemoveProductConfirmDialogController',
        scope: {
            product: '='
        }
    }
});
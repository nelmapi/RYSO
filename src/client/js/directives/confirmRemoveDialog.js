angular.module("ryso").directive('confirmRemoveDialog', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/ConfirmRemoveDialog.ng.html',
        replace: true,
        transclude: true,
        controller: 'ConfirmRemoveDialogController',
        scope: {
            itemId: '=',
            message: "=",
            itemType: '='
        }
    }
});
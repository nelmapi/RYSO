angular.module("ryso").directive('createProductForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/createProductForm.ng.html',
        replace: true,
        transclude: true,
        controller: 'CreateProductFormController',
        scope: {
            newProduct: '='
        }
    }
});
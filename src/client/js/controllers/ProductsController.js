angular.module("ryso").controller("ProductsController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){

        $scope.products = $meteor.collection(Products);
        $scope.productToDelete = null;
        $scope.productToEdit = {};

        $scope.showRemoveDialog = function (product) {
            $scope.productToDelete = product;
            $('#productConfirmFormModal').modal('show');
        };

        $scope.getProductToDelete = function () {
            return $scope.productToDelete;
        };

        $scope.getProductToEdit = function () {
            return $scope.productToEdit;
        };

        $scope.$on('confirmRemoveProduct', function(event, productId) {
            Products.remove(productId);
            $('#productConfirmFormModal').modal('hide');
        });

        $scope.$on('closeProductForm', function(event) {
            $scope.productToEdit = {};
        });

        $scope.edit = function(product) {
            $scope.productToEdit = product;
            $('#productFormModal').modal('show');
        };
    }
]);
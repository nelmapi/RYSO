angular.module("ryso").controller("ProductsController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){

        $scope.products = $meteor.collection(Products).subscribe('allProducts');
        $scope.productToDelete = null;
        $scope.productToEdit = {};

        $scope.getType = function () {
            return 'Producto';
        };

        $scope.getDeleteMessage = function () {
            var message = $scope.productToDelete ? '¿El producto "' + $scope.productToDelete.name  + '" sera eliminado, desea continuar?' : '';
            return message;
        };

        $scope.showRemoveDialog = function (product) {
            $scope.productToDelete = product;
            $('#confirmRemoveDialogModal').modal('show');
        };

        $scope.getProductToDelete = function () {
            return $scope.productToDelete;
        };

        $scope.getProductToEdit = function () {
            return $scope.productToEdit;
        };

        $scope.$on('confirmRemoveSuccess', function(event, itemId, itemType) {
            if (itemType === 'Producto') {
                Products.remove(itemId);
            }
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
angular.module("ryso").controller("RemoveProductConfirmDialogController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.removeProduct = function(product) {
            $scope.$emit('confirmRemoveProduct', product._id);
        };
    }
]);
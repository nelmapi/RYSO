angular.module("ryso").controller("ConfirmRemoveDialogController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.removeProduct = function() {
            $scope.$emit('confirmRemoveSuccess', $scope.itemId, $scope.itemType);
            $('#confirmRemoveDialogModal').modal('hide');
        };
    }
]);
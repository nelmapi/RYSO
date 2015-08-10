angular.module("ryso").controller("OrdersController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.selection = 'newOrderBtn';
        $scope.currentOrder = new Order();
    }
]);
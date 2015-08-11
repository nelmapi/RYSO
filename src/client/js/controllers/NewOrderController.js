angular.module("ryso").controller("NewOrderController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter) {

        $scope.newOrder = $scope.newOrder || new Order();

        $meteor.subscribe('allProducts');

        $scope.dishes = $meteor.collection(function () {
            return Products.find({type: 'Plato'});
        });

        $scope.beverages = $meteor.collection(function () {
            return Products.find({type: 'Bebida'});
        });

        $scope.addItem = function (product) {
            $scope.newOrder.addItem(product);
        };

        $scope.tableScrollOptions = {};
    }
]);

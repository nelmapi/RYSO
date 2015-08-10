angular.module("ryso").controller("NewOrderController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter) {

        // $scope.newOrder = new Order();
        $meteor.subscribe('allProducts');
        $scope.dishes = $meteor.collection(function () {
            return Products.find({type: 'Plato'});
        });
        $scope.beverages = $meteor.collection(function () {
            return Products.find({type: 'Bebida'});
        });

        $scope.addItem = function (product) {
            console.log('Adding Item', product);
            console.log('newOrder', $scope.newOrder);
            $scope.newOrder.addItem(product);
        };
    }
]);
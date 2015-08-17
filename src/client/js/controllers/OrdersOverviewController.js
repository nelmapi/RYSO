angular.module("ryso").controller("OrdersOverviewController", ['$scope', '$stateParams', '$meteor', '$filter', '$timeout',
    function($scope, $stateParams, $meteor, $filter, $timeout) {

        $meteor.subscribe('todayOrders');

        $scope.pendingOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.PENDING_STATE});
        }, false);

        $scope.inProgressOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.IN_PROGRESS_STATE});
        }, false);

        $scope.deliveredOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.DELIVERED_STATE});
        }, false);

        var OrderColumn = function (state, orders) {
            this.state = state;
            this.orders = orders;
        };

        var orderColumns = [
            new OrderColumn(OrderContans.PENDING_STATE, $scope.pendingOrders),
            new OrderColumn(OrderContans.IN_PROGRESS_STATE, $scope.inProgressOrders),
            new OrderColumn(OrderContans.DELIVERED_STATE, $scope.deliveredOrders)
        ];

        $scope.ordersOverview = {
            numberOfColumns: orderColumns.length,
            columns: orderColumns
        };

        $scope.overviewSortOptions = {

            itemMoved: function (event) {
              event.source.itemScope.modelValue.state = event.dest.sortableScope.$parent.column.state;
            },
            orderChanged: function (event) {
            },
            containment: '#ordersOverviewContainer'
        };
    }
]);
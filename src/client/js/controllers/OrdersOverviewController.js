angular.module("ryso").controller("OrdersOverviewController", ['$scope', '$stateParams', '$meteor', '$filter', '$timeout',
    function($scope, $stateParams, $meteor, $filter, $timeout) {

       $scope.isFullScreen = false;

       $scope.goFullScreen = function() {
          $scope.isFullScreen = !$scope.isFullScreen;
       };

        $scope.allLineItems = {};

        $meteor.subscribe('todayOrders').then(function (subscriptionHandle) {
            $scope.ordersSubscription = subscriptionHandle;
        });

        $meteor.subscribe('allItems').then(function (subscriptionHandle) {
            $scope.itemsSubscription = subscriptionHandle;
            LineItems.find().fetch().forEach(function (item) {
                if (!$scope.allLineItems[item.order_id]) {
                    $scope.allLineItems[item.order_id] = [];
                }
                $scope.allLineItems[item.order_id].push(item);
            });
        });

        $scope.allLineItemsCollection = $meteor.collection(LineItems, false);

        $scope.pendingOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.PENDING_STATE}, {sort: {numOrder: 1}});
        }, false);

        $scope.inProgressOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.IN_PROGRESS_STATE}, {sort: {numOrder: 1}});
        }, false);

        $scope.deliveredOrders = $meteor.collection(function() {
            return Orders.find({state: OrderContans.DELIVERED_STATE}, {sort: {numOrder: 1}});
        }, false);

        var OrderColumn = function (state, orders) {
            this.state = state;
            this.orders = orders;
            this.sort = function () {
                this.orders.sort(function (a, b) {
                    return a.numOrder - b.numOrder;
                })
            };
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
            /*accept: function (sourceItemHandleScope, destSortableScope) {
              return sourceItemHandleScope.itemScope.sortableScope.$id !== destSortableScope.$id;
            },*/
            itemMoved: function (event) {
                var newState = event.dest.sortableScope.$parent.column.state;
                var order = event.source.itemScope.modelValue;
                order.state = newState;
                $meteor.collection(Orders, false).save(order);
                event.dest.sortableScope.removeItem(event.dest.index);
                event.dest.sortableScope.$parent.column.sort();
            },
            orderChanged: function (event) {
                console.log('event', event);
                event.dest.sortableScope.$parent.column.sort();
            },
            containment: '#ordersOverviewContainer'
        };

        $scope.updateAllLineItems = function () {
            $scope.allLineItems = {};
            $scope.allLineItemsCollection.forEach(function(item) {
                if (!$scope.allLineItems[item.order_id]) {
                    $scope.allLineItems[item.order_id] = [];
                }
                $scope.allLineItems[item.order_id].push(item);
            });
        };

        $scope.getLineItems = function (orderId) {
            var lineItems = [];
            $scope.updateAllLineItems();
            if ($scope.allLineItems[orderId]) {
                lineItems = $scope.allLineItems[orderId];
            }

            return lineItems;
        };

        $scope.$on("$destroy", function () {
            if ($scope.ordersSubscription) {
                $scope.ordersSubscription.stop();
            }
            if ($scope.itemsSubscription) {
                $scope.itemsSubscription.stop();
            }
        });
    }
]);
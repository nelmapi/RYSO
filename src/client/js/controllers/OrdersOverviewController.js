angular.module("ryso").controller("OrdersOverviewController", ['$scope', '$stateParams', '$meteor', '$timeout', 'userPermissions',
    function($scope, $stateParams, $meteor, $timeout, userPermissions) {

       $scope.isFullScreen = false;
       $scope.productType = 'Plato';
       $scope.canHandleBeverageOrders = userPermissions.canHandleBeverageOrders;

        $scope.$watch('productType', function (newValue, oldValue) {
            $scope.setupColumLists();
            $scope.setupOrdersOverview();
            $scope.setAllItemCollection();
            $scope.updateAllLineItems();
        });

        $scope.allLineItemsCollection = [];

        $scope.allLineItems = {};

        $meteor.subscribe('allProducts').then(function (subscriptionHandle) {
            $scope.productsSubscription = subscriptionHandle;
        });

        $meteor.subscribe('todayOrders').then(function (subscriptionHandle) {
            $scope.ordersSubscription = subscriptionHandle;
        });

        $meteor.subscribe('allItems').then(function (subscriptionHandle) {
            $scope.itemsSubscription = subscriptionHandle;
            $scope.setAllItemCollection();
            $scope.updateAllLineItems();
            $scope.productType = 'Bebida';
        });

        $scope.products = $meteor.collection(function(){
            return Products.find({type: $scope.getReactively('productType')});
        });

        $scope.setAllItemCollection = function () {
            $scope.allLineItemsCollection = $meteor.collection(function () {
                var productIds = [];
                $scope.products.forEach(function (product) {
                    productIds.push(product._id);
                });
                return LineItems.find({product_id: {$in: productIds}});
            }, false);
        };

        $scope.setupColumLists = function() {

            $scope.pendingOrders = $meteor.collection(function() {
                var selector = {state: OrderContans.PENDING_STATE};
                if ($scope.productType == 'Plato') {
                    selector = {beveragesState: OrderContans.BEVERAGES_PENDING_STATE};
                }
                return Orders.find(selector, {sort: {numOrder: 1}});
            }, false);

            $scope.inProgressOrders = $meteor.collection(function() {
                return Orders.find({state: OrderContans.IN_PROGRESS_STATE}, {sort: {numOrder: 1}});
            }, false);

            $scope.preparedOrders = $meteor.collection(function() {
                return Orders.find({state: OrderContans.PREPARED_STATE}, {sort: {numOrder: 1}});
            }, false);

            $scope.deliveredOrders = $meteor.collection(function() {
                var selector = {state: OrderContans.DISHES_DELIVERED_STATE};
                if ($scope.productType == 'Plato') {
                    selector = {beveragesState: OrderContans.BEVERAGES_DELIVERED_STATE};
                }
                return Orders.find(selector, {sort: {numOrder: 1}});
            }, false);
        };

        var OrderColumn = function (state, orders) {
            this.state = state;
            this.orders = orders;
            this.sort = function () {
                this.orders.sort(function (a, b) {
                    return a.numOrder - b.numOrder;
                })
            };
        };

        $scope.ordersOverview = {
            numberOfColumns: 0,
            columns: []
        };

        $scope.setupOrdersOverview = function () {
            if (userPermissions.canHandleOrderState) {
                var columns = [];
                if (userPermissions.canHandleKitchenOrders || (userPermissions.canHandleBeverageOrders && $scope.productType == 'Plato')) {
                    columns.push(new OrderColumn(OrderContans.PENDING_STATE, $scope.pendingOrders));
                }
                if (($scope.productType != 'Plato') && userPermissions.canHandleKitchenOrders) {
                    columns.push(new OrderColumn(OrderContans.IN_PROGRESS_STATE, $scope.inProgressOrders));
                }
                if (($scope.productType != 'Plato') && (userPermissions.canHandleKitchenOrders || userPermissions.canHandleDishOrders)) {
                    columns.push(new OrderColumn(OrderContans.PREPARED_STATE, $scope.preparedOrders));
                }
                if (userPermissions.canHandleDishOrders) {
                    columns.push(new OrderColumn(OrderContans.DELIVERED_STATE, $scope.deliveredOrders));
                }

                $scope.ordersOverview.numberOfColumns = columns.length;
                $scope.ordersOverview.columns = columns;
            }
        };

        $scope.overviewSortOptions = {
            itemMoved: function (event) {
                var newState = event.dest.sortableScope.$parent.column.state;
                var order = event.source.itemScope.modelValue;
                if ($scope.productType == 'Plato') {
                    order.beveragesState = newState;
                } else {
                    order.state = newState;
                }

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

            lineItems.sort(function (a, b) {
                return (a.isForCarry === b.isForCarry)? 0 : b.isForCarry? -1 : 1;
            });

            return lineItems;
        };

        $scope.goFullScreen = function() {
            $scope.isFullScreen = !$scope.isFullScreen;
        };

        $scope.$on("$destroy", function () {
            if ($scope.ordersSubscription) {
                $scope.ordersSubscription.stop();
            }
            if ($scope.itemsSubscription) {
                $scope.itemsSubscription.stop();
            }
            if ($scope.productsSubscription) {
                $scope.productsSubscription.stop();
            }
        });

        $scope.setupColumLists();
        $scope.setupOrdersOverview();
    }
]);
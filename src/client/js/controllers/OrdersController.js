angular.module("ryso").controller("OrdersController", ['$scope', '$stateParams', '$meteor', '$filter', 'userPermissions',
    function($scope, $stateParams, $meteor, $filter, userPermissions){

        $meteor.subscribe('allOrders').then(function (subscriptionHandle) {
            $scope.allOrdersSubscription = subscriptionHandle;
        });

        $scope.canHandleOrderState = userPermissions.canHandleOrderState;
        $scope.canManageOrders = userPermissions.canManageOrders;
        $scope.canViewOptionButtons = ($scope.canHandleOrderState && $scope.canManageOrders);

        $scope.setOptionView = function (optionView) {
            this.selection = optionView;
        };

        $scope.init = function () {
            $scope.currentOrder = $scope.currentOrder || new Order();

            $scope.selection = $scope.canManageOrders ? 'newOrderBtn' : 'ordersOverviewBtn';

            if (!$scope.currentOrder.isNew()) {
                $meteor.subscribe('orderItems', $scope.currentOrder._id).then(function (subscriptionHandle) {
                    $scope.subscriptionHandle = subscriptionHandle;
                    $scope.setLineItems();
                });
            } else {
                $meteor.subscribe('orderItems', '').then(function (subscriptionHandle) {
                    $scope.subscriptionHandle = subscriptionHandle;
                    $scope.setLineItems();
                });
            }

            $scope.lineItems = $meteor.collection(function() {
                return LineItems.find({order_id: {$ne: null}});
            }, false);
        };

        $scope.setLineItems = function () {
            var lineItems = {};
            $scope.lineItems.forEach(function (lineItem) {
                lineItems[lineItem.product_id] = lineItem;
                $scope.currentOrder.$$lineItems = lineItems;
            });
        };

        $scope.getCurrentOrder = function () {
            return $scope.currentOrder;
        };

        $scope.getLineItems = function () {
            return $scope.lineItems;
        };

        $scope.stopSubscription = function() {
            if ($scope.subscriptionHandle) {
                $scope.subscriptionHandle.stop();
            }
            if ($scope.allOrdersSubscription) {
                $scope.allOrdersSubscription.stop();
            }
        };

        $scope.$on('editOrder', function (event, orderId) {
            $scope.currentOrder = $meteor.object(Orders, orderId, false);
            $scope.stopSubscription();
            $scope.init();
        });

        $scope.$on('clearCurrentOrder', function (event) {
            $scope.currentOrder = new Order();
            $scope.stopSubscription();
            $scope.init();
        });

        $scope.$on("$destroy", function () {
            $scope.stopSubscription();
        });

        $scope.init();
    }
]);

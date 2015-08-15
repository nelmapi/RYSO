angular.module("ryso").controller("NewOrderController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter) {

        $meteor.subscribe('allProducts');
        $scope.currentProductType = 'Plato';

        $scope.products = $meteor.collection(function(){
            return Products.find({type: $scope.getReactively('currentProductType')});
        });

        $scope.addItem = function (product) {
            var isNewItem = $scope.newOrder.hasProductItem(product._id);
            var lineItem = $scope.newOrder.addItem(product);
            if (!isNewItem) {
                $scope.lineItems.push(lineItem);
            }
        };

        $scope.setProductType = function (productType) {
            $scope.currentProductType = productType;
        };

        $scope.updateItemSubTotal = function(item) {
            item.updateSubtotal();
            $scope.newOrder.updateTotal();
        };

        $scope.updateItemPrice = function(item) {
            item.updatePrice();
            $scope.newOrder.updateTotal();
        };

        $scope.saveOrder = function() {

            if (!$scope.lineItems.length) {
                return;
            };

            if ($scope.newOrder.isNew()) {
                //var orderId = Orders.insert($scope.newOrder.getRawOrder());

                $meteor.call('saveOrder', $scope.newOrder.getRawOrder()).then(
                    function (orderId) {
                        $scope.saveLineItems(orderId);
                        $scope.clearOrder();
                    },
                    function (err) {
                        console.log('failed', err);
                    }
                );
            } else {
                var rawOrder = $scope.newOrder.getRawOrder();
                $scope.newOrder.stop();
                $meteor.collection(Orders, false).save(rawOrder);
                $scope.saveLineItems($scope.newOrder._id);
                $scope.clearOrder();
            }


        };

        $scope.saveLineItems = function (orderId) {
            var newItems = [];
            $scope.lineItems.forEach(function (item) {
                item.setOrderId(orderId);
                newItems.push(item);
            });

            $scope.lineItems.stop();
            $scope.lineItems.save(newItems);
        };

        $scope.clearOrder = function () {
            $scope.$emit('clearCurrentOrder');
        };

        angular.element(document).ready(function () {
            $scope.isReservationToogle = $('#isReservationCheckBox').bootstrapToggle({on: 'Si', off: 'No', size: 'mini'});

            if ($scope.newOrder.reservation) {
                $('#isReservationCheckBox').bootstrapToggle('on');
            }

            $('#isReservationCheckBox').change(function() {
                $scope.newOrder.reservation = $(this).prop('checked');
                $scope.$apply();
            });
        });
    }
]);

angular.module("ryso").controller("NewOrderController", ['$scope', '$stateParams', '$meteor', '$filter', '$timeout',
    function($scope, $stateParams, $meteor, $filter, $timeout) {

        $meteor.subscribe('allProducts').then(function (subscriptionHandle) {
            $scope.productsSubscription = subscriptionHandle;
        });
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
                $scope.successSave = false;
                $scope.message = 'La orden no puede emitirse sin productos, por favor agrege algunos y vuelva a intentarlo.';
                return;
            };

            if ($scope.newOrder.isServedInTable() && !$scope.newOrder.tableNumber) {
                $scope.successSave = false;
                $scope.message = 'Por favor ingrese un numero de mesa (mayor a cero).';
                return;
            }

            if ($scope.newOrder.isNew()) {
                $meteor.call('saveOrder', $scope.newOrder.getRawOrder()).then(
                    function (orderId) {
                        $scope.saveLineItems(orderId);
                        $scope.message = 'Orden emitida exitosamente!';
                        $scope.clearOrder();
                        $scope.successSave = true;
                        $timeout(function () {
                            $scope.message = '';
                        }, 2500);
                    },
                    function (err) {
                        console.log('failed', err);
                        if (err.error == 'tableNumber-exists') {
                            $scope.successSave = false;
                            $scope.message = 'La mesa #' + $scope.newOrder.tableNumber + ' ya fue asignado, por favor ingrese otro numero.';
                            console.log($scope.message);
                        }
                    }
                );
            } else {
                var rawOrder = $scope.newOrder.getRawOrder();
                $scope.newOrder.stop();
                $meteor.collection(Orders, false).save(rawOrder);
                $scope.saveLineItems($scope.newOrder._id);
                $scope.clearOrder();
                $scope.successSave = true;
                $scope.message = 'Orden editada exitosamente!';
                $timeout(function () {
                    $scope.message = '';
                }, 2500);
            }
        };

        $scope.saveLineItems = function (orderId) {
            var newItems = [];
            $scope.lineItems.forEach(function (item) {
                item.setOrderId(orderId);
                item.removeReferences();
                newItems.push(item);
            });

            $scope.lineItems.stop();
            $scope.lineItems.save(newItems);
        };

        $scope.updateToggleButton = function () {
            if ($scope.newOrder.reservation) {
                $('#isReservationCheckBox').bootstrapToggle('on');
            } else {
                $('#isReservationCheckBox').bootstrapToggle('off');
            }
        };

        $scope.clearOrder = function () {
            $scope.$emit('clearCurrentOrder');
            $timeout($scope.updateToggleButton, 200, false);
        };

        $scope.$on("$destroy", function () {
            if ($scope.productsSubscription) {
                $scope.productsSubscription.stop();
            }
        });

        angular.element(document).ready(function () {
            $('#isReservationCheckBox').bootstrapToggle({on: 'Si', off: 'No', size: 'mini'});

            $scope.updateToggleButton();

            $('#isReservationCheckBox').change(function() {
                $scope.newOrder.reservation = $(this).prop('checked');
                $scope.$apply();
            });
        });
    }
]);

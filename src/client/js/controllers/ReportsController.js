angular.module("ryso").controller("ReportsController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout', 'userPermissions',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout, userPermissions){

        $scope.periodType = 'weekly';

        //data subbscriptions
        $meteor.subscribe('allItems').then(function(subscription) {
            $scope.lineItemSubscription = subscription;
        });

        $meteor.subscribe('allOrders').then(function(subscription) {
            $scope.orderSubscription = subscription;
        });

        $meteor.subscribe('allProducts').then(function(subscription) {
            $scope.productSubscription = subscription;
        });

        $scope.lineItems = $meteor.collection(LineItems, false);

        $scope.products = $meteor.collection(Products, false);

        // charts data
        $scope.dishesIncomesDataHeader = [{label: 'Producto', type: 'string'}, {label: 'Total', type: 'number'}, {type: 'string', role: 'annotation'}];
        $scope.dishesIncomesData = [];

        $scope.beveragesIncomesDataHeader = [{label: 'Producto', type: 'string'}, {label: 'Total', type: 'number'}, {type: 'string', role: 'annotation'}];
        $scope.beveragesIncomesData = [];

        $scope.dishesQuantityDataHeader = [{label: 'Producto', type: 'string'}, {label: 'Total', type: 'number'}, {type: 'string', role: 'annotation'}];
        $scope.dishesQuantityData = [];

        $scope.beveragesQuantityDataHeader = [{label: 'Producto', type: 'string'}, {label: 'Total', type: 'number'}, {type: 'string', role: 'annotation'}];
        $scope.beveragesQuantityData = [];

        // chart options

        $scope.dishesIncomesOptions = {
            colors: ['#9575cd'],
            title: 'Ingresos por Producto (Platos)',
            legend: { position: 'bottom', maxLines: 2},
            width: '100%',
            height: '500',
            annotations: {
              alwaysOutside: true,
              textStyle: {
                fontSize: 14,
                color: '#000',
                auraColor: 'none'
              }
            },
            hAxis: {
                title: 'Platos',
            },
            vAxis: {
                title: 'En Bs'
            }
        };

        $scope.beveragesIncomesOptions = {
            colors: ['#33ac71'],
            title: 'Ingresos por Producto (Bebida)',
            legend: { position: 'bottom', maxLines: 2},
            width: '100%',
            height: '500',
            annotations: {
              alwaysOutside: true,
              textStyle: {
                fontSize: 14,
                color: '#000',
                auraColor: 'none'
              }
            },
            hAxis: {
                title: 'Bebidas',
            },
            vAxis: {
                title: 'En Bs'
            }
        };

        $scope.dishesQuantityOptions = {
            title: 'Cantidad de Platos Vendidos',
            legend: { position: 'bottom', maxLines: 2},
            width: '100%',
            height: '500',
            annotations: {
              alwaysOutside: true,
              textStyle: {
                fontSize: 14,
                color: '#000',
                auraColor: 'none'
              }
            },
            hAxis: {
                title: 'Platos',
            },
            vAxis: {
                title: 'Cantidad'
            }
        };

        $scope.beveragesQuantityOptions = {
            title: 'Cantidad de Bebidas Vendidas',
            legend: { position: 'bottom', maxLines: 2},
            width: '100%',
            height: '500',
            annotations: {
              alwaysOutside: true,
              textStyle: {
                fontSize: 14,
                color: '#000',
                auraColor: 'none'
              }
            },
            hAxis: {
                title: 'Bebidas',
            },
            vAxis: {
                title: 'Cantidad'
            },
            seriesType: "bars",
            series: {1: {type: "line", lineWidth: 4}}
        };

        $scope.initProductMaps = function () {
            $scope.dishesMap = {};
            $scope.beveragesMap = {};
            $scope.products.forEach(function(product) {
                if (product.type == 'Plato') {
                    $scope.dishesMap[product._id] = product;
                } else {
                    $scope.beveragesMap[product._id] = product;
                }
            });
        };

        $scope.initDishesIncomesData = function () {
            $scope.dishesIncomesData = [$scope.dishesIncomesDataHeader];
            $scope.dishesQuantityData = [$scope.dishesQuantityDataHeader];
            var data = {};
            $scope.lineItems.forEach(function(item) {
                if (!$scope.dishesMap[item.product_id]) return;
                if (!data[item.detail]) {
                    data[item.detail] = {subTotal : 0, qtty: 0};
                }
                data[item.detail].subTotal += item.subTotal;
                data[item.detail].qtty += item.quantity;
            });

            for (detail in data) {
                $scope.dishesIncomesData.push([detail, data[detail].subTotal, '' + data[detail].subTotal]);
                $scope.dishesQuantityData.push([detail, data[detail].qtty, '' + data[detail].qtty]);
            }
        }

        $scope.initBeveragesIncomesData = function () {
            $scope.beveragesIncomesData = [$scope.beveragesIncomesDataHeader];
            $scope.beveragesQuantityData = [$scope.beveragesQuantityDataHeader];
            var data = {};
            $scope.lineItems.forEach(function(item) {
                if (!$scope.beveragesMap[item.product_id]) return;
                if (!data[item.detail]) {
                    data[item.detail] = {subTotal : 0, qtty: 0};
                }
                data[item.detail].subTotal += item.subTotal;
                data[item.detail].qtty += item.quantity;
            });

            for (detail in data) {
                $scope.beveragesIncomesData.push([detail, data[detail].subTotal, '' + data[detail].subTotal]);
                $scope.beveragesQuantityData.push([detail, data[detail].qtty, '' + data[detail].qtty]);
            }
        }

        $scope.initChartsData = function () {
            $scope.initProductMaps();
            $scope.initDishesIncomesData();
            $scope.initBeveragesIncomesData();
        };

        $scope.createCharts = function () {
            $scope.initChartsData();

            $scope.dishesIncomesCharData = google.visualization.arrayToDataTable($scope.dishesIncomesData);
            $scope.beveragesIncomesCharData = google.visualization.arrayToDataTable($scope.beveragesIncomesData);
            $scope.dishesQuantityCharData = google.visualization.arrayToDataTable($scope.dishesQuantityData);
            $scope.beveragesQuantityCharData = google.visualization.arrayToDataTable($scope.beveragesQuantityData);

            $scope.dishesIncomesChart = new google.visualization.ColumnChart(document.getElementById('dishesIncomesChart'));
            $scope.beveragesIncomesChart = new google.visualization.ColumnChart(document.getElementById('beveragesIncomesChart'));
            $scope.dishesQuantityChart = new google.visualization.ColumnChart(document.getElementById('dishesQuantityChart'));
            $scope.beveragesQuantityChart = new google.visualization.ColumnChart(document.getElementById('beveragesQuantityChart'));

            $scope.dishesIncomesChart.draw($scope.dishesIncomesCharData, $scope.dishesIncomesOptions);
            $scope.beveragesIncomesChart.draw($scope.beveragesIncomesCharData, $scope.beveragesIncomesOptions);
            $scope.dishesQuantityChart.draw($scope.dishesQuantityCharData, $scope.dishesQuantityOptions);
            $scope.beveragesQuantityChart.draw($scope.beveragesQuantityCharData, $scope.beveragesQuantityOptions);
        };

        $scope.$on('$destroy', function() {
            if ($scope.lineItemSubscription) {
                $scope.lineItemSubscription.stop();
            }
            if ($scope.orderSubscription) {
                $scope.orderSubscription.stop();
            }
            if ($scope.productSubscription) {
                $scope.productSubscription.stop();
            }
        });

        $timeout($scope.createCharts, 1000);
    }
]);

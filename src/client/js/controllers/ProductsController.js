angular.module("ryso").controller("ProductsController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.products = [
            {
                'code': "CO05",
                'name': "Charque",
                'type': "Plato",
                'description': "dfadf",
                'localprice': 12,
                'outsideprice': 15
            },
            {
                'code': "CO06",
                'name': "Pique",
                'type': "Plato",
                'description': "ddddd",
                'localprice': 16,
                'outsideprice': 19
            },
            {
                'code': "CO07",
                'name': "Pato",
                'type': "Plato",
                'description': "dd dsfasf",
                'localprice': 22,
                'outsideprice': 25
            }
        ];

        $scope.load = function(){
            //TODO: read data from server
        };

        $scope.add = function(){
            //TODO: add a new product
        };

        $scope.remove = function(code){
            console.log("remove product " + code);

        };

        $scope.edit = function(product){

        };
    }
]);
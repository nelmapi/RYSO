angular.module("ryso").controller("OrderListController", ['$scope', '$stateParams', '$meteor', '$filter',
  function($scope, $stateParams, $meteor, $filter){
  		$scope.orders = $meteor.collection(Orders);
  }
]);
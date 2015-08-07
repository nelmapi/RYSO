angular.module("ryso").controller("OrderListController", ['$scope', '$stateParams', '$meteor', '$filter',
  function($scope, $stateParams, $meteor, $filter){

      $scope.orderToDelete = null;
      $scope.orderToEdit = null;

      $scope.orders = $meteor.collection(Orders);

      $scope.getType = function () {
        return 'Orden';
      };

      $scope.getDeleteMessage = function () {
        var message = $scope.orderToDelete ? '¿La orden Nro. "' + $scope.orderToDelete.numOrder + '" sera eliminada, desea continuar?' : '';
        return message;
      };

      $scope.showRemoveDialog = function (order) {
        $scope.orderToDelete = order;
        $('#confirmRemoveDialogModal').modal('show');
      };

      $scope.getOrderToDelete = function () {
        return $scope.orderToDelete;
      };

      $scope.getOrderToEdit = function () {
        return $scope.orderToEdit;
      };

      $scope.$on('confirmRemoveSuccess', function(event, itemId, itemType) {
        if (itemType === 'Orden') {
          Orders.remove(itemId);
        }
      });

      $scope.edit = function(order) {
        $scope.orderToEdit = order;
        $('#productFormModal').modal('show');
      };
  }
]);
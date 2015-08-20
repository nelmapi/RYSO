angular.module("ryso").controller("UsersController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout){

        $meteor.subscribe('allUsers').then(function (subscriptionHandle) {
            $scope.usersSubscription = subscriptionHandle;
        });

        $scope.users = $meteor.collection(function () {
            return Meteor.users.find({'profile.userType':{$ne:'root'}});
        }, false);

        $scope.userToEdit = null;
        $scope.userToDelete = null;

        $scope.getType = function () {
            return 'Usuario';
        };

        $scope.getDeleteMessage = function () {
            var message = $scope.userToDelete ? '¿El usuario "' + $scope.userToDelete.username  + '" sera eliminado, desea continuar?' : '';
            return message;
        };

        $scope.showRemoveDialog = function (user) {
            $scope.userToDelete = user;
            $('#confirmRemoveDialogModal').modal('show');
        };

        $scope.getUssrToEdit = function () {
            return $scope.userToEdit;
        };

        $scope.getUserToDelete = function () {
            return $scope.userToDelete;
        };

        $scope.edit = function(user) {
            $scope.userToEdit = user;
            $('#userFormModal').modal('show');
        };

        $scope.$on('confirmRemoveSuccess', function(event, userId, itemType) {
            if (itemType === 'Usuario') {
                Meteor.users.remove(userId);
            }
        });

        $scope.stopSubscriptions = function () {
            if ($scope.usersSubscription) {
                $scope.usersSubscription.stop();
            }
        };

        $scope.$on("$destroy", function () {
            $scope.stopSubscriptions();
        });
    }
]);

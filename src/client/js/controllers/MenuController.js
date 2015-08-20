angular.module("ryso").controller("MenuController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout', 'userPermissions',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout, userPermissions){

        $rootScope.initMenu = function () {

            if (!userPermissions.isUserLogged) {
                userPermissions.refresh();
            }

            $scope.isUserLogged = userPermissions.isUserLogged;
            $scope.canViewProducts = userPermissions.canViewProducts;
            $scope.canViewOrders = userPermissions.canViewOrders;
            $scope.canViewUsers = userPermissions.canViewUsers;
            $scope.canViewReports = userPermissions.canViewReports;

            if ($scope.isUserLogged) {
                $scope.fullUserName = userPermissions.user.profile.firstName;
                $scope.fullUserName += userPermissions.user.profile.lastName ? ' ' + userPermissions.user.profile.lastName : '';
            }
        };

        $scope.currentPageIs = function (pageName) {
            return Session.get('currentPage') == pageName;
        };

        $scope.logout = function () {
            Meteor.logout(function() {
                userPermissions.refresh();
                $rootScope.initMenu();
                $state.go('login');
            });
        };

        $timeout($rootScope.initMenu, 200, true);
    }
]);

angular.module("ryso").controller("MenuController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout){

        $rootScope.initMenu = function () {
            $scope.userId = Meteor.userId();
            $scope.isUserLogged = ($scope.userId ? true : false);
            $scope.user = $scope.isUserLogged ? Meteor.user() : {};
            $scope.fullUserName = $scope.isUserLogged ? $scope.user.profile.firstName: '';
            $scope.fullUserName += ($scope.isUserLogged && $scope.user.profile.lastName) ? ' ' + $scope.user.profile.lastName : '';
            $scope.canViewProducts = ($scope.isUserLogged && Roles.userIsInRole($scope.userId, UserRole.PRODUCT_MANAGER));
            $scope.canViewOrders = ($scope.isUserLogged && (Roles.userIsInRole($scope.userId, UserRole.ORDER_MANAGER)
                                                            || Roles.userIsInRole($scope.userId, UserRole.VIEW_ORDERS)));
            $scope.canViewUsers = ($scope.isUserLogged && Roles.userIsInRole($scope.userId, UserRole.MANAGE_USERS));
            $scope.canViewReports = ($scope.isUserLogged && Roles.userIsInRole($scope.userId, UserRole.VIEW_REPORTS));
        };

        $scope.currentPageIs = function (pageName) {
            return Session.get('currentPage') == pageName;
        };

        $scope.logout = function () {
            Meteor.logout(function() {
                $rootScope.initMenu();
                $state.go('login');
            });
        };

        $timeout($rootScope.initMenu, 200, true);
    }
]);

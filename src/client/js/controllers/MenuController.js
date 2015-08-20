angular.module("ryso").controller("MenuController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout){

        $rootScope.initMenu = function () {
            $scope.userId = Meteor.userId();
            $scope.isUserLogged = ($scope.userId ? true : false);
            $scope.user = {};
            if ($scope.isUserLogged) {
                $scope.user = Meteor.user();
                $scope.fullUserName = $scope.user.profile.firstName;
                $scope.fullUserName += $scope.user.profile.lastName ? ' ' + $scope.user.profile.lastName : '';
                $scope.canViewProducts = Roles.userIsInRole($scope.userId, UserRole.MANAGE_PRODUCTS);
                $scope.canViewOrders = Roles.userIsInRole($scope.userId, [UserRole.MANAGE_ORDERS,
                                                                          UserRole.VIEW_ORDERS,
                                                                          UserRole.HANDLE_KITCHEN_ORDERS,
                                                                          UserRole.HANDLE_BEVERAGE_ORDERS,
                                                                          UserRole.HANDLE_DISH_ORDERS]);
                $scope.canViewUsers = Roles.userIsInRole($scope.userId, UserRole.MANAGE_USERS);
                $scope.canViewReports = Roles.userIsInRole($scope.userId, UserRole.VIEW_REPORTS);
            }
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

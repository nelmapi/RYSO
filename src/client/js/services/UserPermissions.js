angular.module("ryso").service('userPermissions', ['$rootScope', function (rootScope) {
    var userPermissions = {};

    userPermissions.refresh = function () {
        this.user = Meteor.user();
        this.isUserLogged = false;
        this.fullUserName = '';
        this.canViewProducts = false;
        this.canViewOrders = false;
        this.canManageOrders = false;
        this.canViewUsers = false;
        this.canViewReports = false;
        this.canHandleKitchenOrders = false;
        this.canHandleBeverageOrders = false;
        this.canHandleDishOrders = false;
        this.canHandleOrderState = false;

        if (this.user) {
            this.isUserLogged = true;
            this.userId = Meteor.userId();
            this.fullUserName = this.user.profile.firstName;
            this.fullUserName += this.user.profile.lastName ? ' ' + this.user.profile.lastName : '';
            this.canViewProducts = Roles.userIsInRole(this.userId, UserRole.MANAGE_PRODUCTS);
            this.canViewOrders = Roles.userIsInRole(this.userId, [UserRole.MANAGE_ORDERS,
                                                                      UserRole.VIEW_ORDERS,
                                                                      UserRole.HANDLE_KITCHEN_ORDERS,
                                                                      UserRole.HANDLE_BEVERAGE_ORDERS,
                                                                      UserRole.HANDLE_DISH_ORDERS]);
            this.canManageOrders = Roles.userIsInRole(this.userId, UserRole.MANAGE_ORDERS);
            this.canViewUsers = Roles.userIsInRole(this.userId, UserRole.MANAGE_USERS);
            this.canViewReports = Roles.userIsInRole(this.userId, UserRole.VIEW_REPORTS);
            this.canHandleKitchenOrders = Roles.userIsInRole(this.userId, UserRole.HANDLE_KITCHEN_ORDERS);
            this.canHandleBeverageOrders = Roles.userIsInRole(this.userId, UserRole.HANDLE_BEVERAGE_ORDERS);
            this.canHandleDishOrders = Roles.userIsInRole(this.userId, UserRole.HANDLE_DISH_ORDERS);
            this.canHandleOrderState = (this.canHandleKitchenOrders || this.canHandleBeverageOrders || this.canHandleDishOrders);
        }
    };

    userPermissions.refresh();

    return userPermissions;
}]);
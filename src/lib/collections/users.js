UserRole = {};
UserRole.MANAGE_PRODUCTS = 'manage-products';
UserRole.VIEW_ORDERS = 'view-orders';
UserRole.MANAGE_ORDERS = 'manage-orders';
UserRole.MANAGE_USERS = 'manage-users';
UserRole.HANDLE_KITCHEN_ORDERS = 'handle-kitchen-orders';
UserRole.HANDLE_BEVERAGE_ORDERS = 'handle-beverage-orders';
UserRole.HANDLE_DISH_ORDERS = 'handle-dish-orders';
UserRole.VIEW_REPORTS = 'view-reports';

UserRole.admin = {
    name: 'Administrador',
    roles : [
        UserRole.MANAGE_PRODUCTS,
        UserRole.MANAGE_ORDERS,
        UserRole.MANAGE_USERS,
        UserRole.HANDLE_KITCHEN_ORDERS,
        UserRole.HANDLE_BEVERAGE_ORDERS,
        UserRole.HANDLE_DISH_ORDERS,
        UserRole.VIEW_REPORTS
    ]
};

UserRole.cashier = {
    name: 'Cajero',
    roles : [
        UserRole.MANAGE_ORDERS
    ]
};

UserRole.chef = {
    name: 'Cocinero',
    roles : [
        UserRole.HANDLE_KITCHEN_ORDERS
    ]
};

UserRole.waiter = {
    name: 'Mesero',
    roles : [
        UserRole.HANDLE_BEVERAGE_ORDERS,
        UserRole.HANDLE_DISH_ORDERS
    ]
};


Meteor.users.allow({
    remove: function(userId, user) {
        return Roles.userIsInRole(Meteor.userId(), UserRole.MANAGE_USERS);
    },
    update: function (userId, doc, fieldNames, modifier) {
        return Roles.userIsInRole(Meteor.userId(), UserRole.MANAGE_USERS);
    }
});
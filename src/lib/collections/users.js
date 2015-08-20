UserRole = {};
UserRole.PRODUCT_MANAGER = 'manage-products';
UserRole.VIEW_ORDERS = 'view-orders';
UserRole.ORDER_MANAGER = 'manage-orders';
UserRole.MANAGE_USERS = 'manage-users';
UserRole.MANAGE_ORDER_STATE = 'manage-order-state';
UserRole.VIEW_REPORTS = 'view-reports';

Meteor.users.allow({
    remove: function(userId, user) {
        return Roles.userIsInRole(Meteor.userId(), UserRole.MANAGE_USERS);
    },
    update: function (userId, doc, fieldNames, modifier) {
        return Roles.userIsInRole(Meteor.userId(), UserRole.MANAGE_USERS);
    }
});
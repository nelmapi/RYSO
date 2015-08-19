//server content
Meteor.startup(function () {
    if (!Counters.find().count()) {
        Counters.insert({_id: "productId", seq: 100});
        Counters.insert({_id: "orderNumber", seq: 1});
    }
    if (!Meteor.users.find().count()) {
        var adminUserId = Accounts.createUser({username:'admin', password: 'admin', profile: 'Administrador'});
        var adminRoles = [UserRole.PRODUCT_MANAGER, UserRole.ORDER_MANAGER, UserRole.MANAGE_USERS, UserRole.MANAGE_ORDER_STATE, UserRole.VIEW_REPORTS];
        Roles.addUsersToRoles(adminUserId, adminRoles);
    }
});

// methods

Meteor.methods({
    saveProduct : function (product) {
        if (product) {
            product.productId = Counters.getNextSecuence('productId');
            product.createdDate = new Date().getTime();
            Products.insert(product);
        } else {
            throw new Meteor.Error("Error", "El producto no pudo insertarse debido a una falla en el servidor.");
        }
    },
    saveOrder : function (order) {
        order.numOrder = Counters.getNextSecuence('orderNumber');
        order.createdDate = new Date().getTime();
        var orderId = Orders.insert(order);
        return orderId;
    },
    deleteOrder : function (orderId) {
        //delete line Items
        LineItems.remove({order_id: orderId});
        Orders.remove(orderId);
    }
});

// publish product sets

Meteor.publish('allProducts', function () {
    return Products.find();
});

//publish orders

Meteor.publish('allOrders', function () {
    return Orders.find();
});

Meteor.publish('todayOrders', function() {
    return Orders.find();
});

// publish sets of line items

Meteor.publish('allItems', function () {
    return LineItems.find();
});

Meteor.publish('orderItems', function (orderId) {
    return LineItems.find({order_id: orderId});
});

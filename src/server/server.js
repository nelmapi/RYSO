//server content
Meteor.startup(function () {
    if (!Counters.find().count()) {
        Counters.insert({_id: "productId", seq: 100});
        Counters.insert({_id: "orderNumber", seq: 1});
    }
    if (!Meteor.users.find({'profile.userType':'root'}).count()) {
        var adminUserId = Accounts.createUser({username:'admin', password: 'admin', profile: {firstName: 'Administrador', userType: 'root'}});
        Roles.setUserRoles(adminUserId, UserRole.admin.roles);
    }
});

Accounts.validateLoginAttempt(function(attemptInfo) {
    if (attemptInfo.methodName == 'createUser') {
        Meteor.call('setUserRoles', attemptInfo.user._id, attemptInfo.user.profile.userType);
    }
    if (attemptInfo.methodName != 'createUser') return true;
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
        var oldOrders = order.tableNumber ? Orders.find({tableNumber: order.tableNumber, state: {$ne: OrderContans.DELIVERED_STATE}}) : null;
        if (!order.tableNumber || (oldOrders.count() == 0)) {
            Orders.update({tableNumber: order.tableNumber, state: OrderContans.DELIVERED_STATE}, {$set: {hidden: true}}, {multi: true});
            order.numOrder = Counters.getNextSecuence('orderNumber');
            order.createdDate = new Date().getTime();
            order.hidden = false;
            var orderId = Orders.insert(order);
            return orderId;
        } else {
            throw new Meteor.Error("tableNumber-exists");
        }
    },
    deleteOrder : function (orderId) {
        //delete line Items
        LineItems.remove({order_id: orderId});
        Orders.remove(orderId);
    },
    setUserPassword: function (userId, profile) {
        Accounts.setPassword(userId, profile.password);
        this.setUserRoles(userId, profile.userType);
    },
    setUserRoles : function (userId, userType) {
        switch(userType) {
            case UserRole.admin.name:
                Roles.setUserRoles(userId, UserRole.admin.roles);
                break;
            case UserRole.cashier.name:
                Roles.setUserRoles(userId, UserRole.cashier.roles);
                break;
            case UserRole.chef.name:
                Roles.setUserRoles(userId, UserRole.chef.roles);
                break;
            case UserRole.waiter.name:
                Roles.setUserRoles(userId, UserRole.waiter.roles);
                break;
            default:
                console.log('Invalid UserType: ' + userType);
        }
    }
});

// publish product sets

Meteor.publish('allProducts', function () {
    return Products.find();
});

//publish orders

Meteor.publish('allOrders', function () {
    return Orders.find({hidden: false});
});

Meteor.publish('todayOrders', function() {
    return Orders.find({hidden: false});
});

// publish sets of line items

Meteor.publish('allItems', function () {
    return LineItems.find();
});

Meteor.publish('orderItems', function (orderId) {
    return LineItems.find({order_id: orderId});
});

Meteor.publish('allOrderItems', function (orderIds) {
    return LineItems.find({order_id: {$in: orderIds}});
});


Meteor.publish('allUsers', function (orderId) {
    return Meteor.users.find();
});
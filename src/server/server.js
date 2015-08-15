//server content
Meteor.startup(function () {
    if (!Counters.find().count()) {
        Counters.insert({_id: "productId", seq: 100});
        Counters.insert({_id: "orderNumber", seq: 1});
    }
});

// methods

Meteor.methods({
    saveProduct : function (product) {
        if (product) {
            product.productId = Counters.getNextSecuence('productId');
            Products.insert(product);
        } else {
            throw new Meteor.Error("Error", "El producto no pudo insertarse debido a una falla en el servidor.");
        }
    },
    saveOrder : function (order) {
        order.numOrder = Counters.getNextSecuence('orderNumber');
        var orderId = Orders.insert(order);
        return orderId;
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

// publish sets of line items

Meteor.publish('orderItems', function (orderId) {
    return LineItems.find({order_id: orderId});
});

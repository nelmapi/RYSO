// Collection
Orders = new Mongo.Collection('Orders', {
    transform: function (order) {
        order.lineItems = LineItems.find({order_id: {$eq: order._id}});
    }
});

// JS Object

Order = function () {
    this.numOrder = '';
    this.type = 'Mesa';
    this.client = '';
    this.state = 'Pendiente';
    this.comment = '';
    this.lineItems = {};
    this.total = 0;

    this.addItem = function (product) {
        if (this.lineItems[product._id]) {
            this.lineItems[product._id].quantity++;
            this.lineItems[product._id].updateSubtotal();
        } else {
            this.lineItems[product._id] = new LineItem(product);
        }
    }
};
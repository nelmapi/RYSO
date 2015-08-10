// Collection
LineItems = new Mongo.Collection('LineItems', {
    transform: function (item) {
        item.product = Products.findOne(item.product_id);
        item.order = Orders.findOne(item.order_id);
    }
});

// JS Object
LineItem = function(product) {
    this.quantity = product ? 1 : 0;
    this.detail = product ? product.name : '';
    this.price = product ? product.localPrice : 0;
    this.subTotal = (this.quantity * this.price);
    this.isForCarry = false;
    this.product_id = product ? product._id : '';
    this.order_id = '';
    this.product = product || {};
    this.order = {};
};

LineItem.prototype.updateSubtotal = function () {
    if (this.product && (this.product.outsidePrice && this.product.localPrice)) {
        this.price = this.isForCarry ? this.product.outsidePrice : this.product.localPrice;
    }

    if (this.price && this.quantity) {
        this.subTotal = this.price * this.quantity;
    } else {
        this.subTotal = 0;
    }

    if (this.order) {
        this.order.lineItems = this.order.lineItems || [];
        var total = 0;
        for (var index = 0; index < this.order.lineItems.length; index ++) {
            var lineItem = this.order.lineItems[index];
            total += lineItem.subTotal;
        }
        this.order.total = total;
    }
};
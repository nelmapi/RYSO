// Collection
LineItems = new Mongo.Collection('LineItems', {
    transform: function (item) {
        item.product = Products.findOne(item.product_id);
        item.order = Orders.findOne(item.order_id);
        item.updateSubtotal = function () {
            LineItem.prototype.updateSubtotal.call(this);
        };
        item.updatePrice = function () {
            LineItem.prototype.updatePrice.call(this);
        };
    }
});

LineItemConstans = {};
LineItemConstans.PENDING_STATE = 'Pendiente';
LineItemConstans.IN_PROGRESS_STATE = 'En Preparacion';
LineItemConstans.PREPARATION_DONE_STATE = 'Preparado';
LineItemConstans.DELIVERED_STATE = 'Despachado';

// JS Object
LineItem = function(product, order) {
    this.quantity = product ? 1 : 0;
    this.detail = product ? product.name : '';
    this.price = product ? product.localPrice : 0;
    this.subTotal = (this.quantity * this.price);
    this.product = product || {};
    this.product_id = this.product._id || '';
    this.order = order || {};
    this.order_id = this.order._id || '';
    this.isForCarry = order.isForCarry || false;
};

LineItem.prototype.updateSubtotal = function () {
    if (this.price && this.quantity) {
        this.subTotal = this.price * this.quantity;
    } else {
        this.subTotal = 0;
    }

    if (this.order && this.order.updateTotal) {
        this.order.updateTotal();
    }
};

LineItem.prototype.updatePrice = function () {
    if (this.product && (this.product.outsidePrice && this.product.localPrice)) {
        this.price = this.isForCarry ? this.product.outsidePrice : this.product.localPrice;
    }
    this.updateSubtotal();
};

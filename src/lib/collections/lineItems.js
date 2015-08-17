// Collection
LineItems = new Mongo.Collection('LineItems', {
    idGeneration: 'MONGO',
    transform: function (item) {
        return new LineItem(item);
    }
});

LineItemConstans = {};
LineItemConstans.PENDING_STATE = 'Pendiente';
LineItemConstans.IN_PROGRESS_STATE = 'En Preparacion';
LineItemConstans.PREPARATION_DONE_STATE = 'Preparado';
LineItemConstans.DELIVERED_STATE = 'Despachado';

// JS Object
LineItem = function() {
    if (arguments.length == 1) {
        _.extend(this, arguments[0]);
    } else {
        this.product = arguments[0] || {};
        var order = arguments[1] || {};
        this.quantity = this.product.name ? 1 : 0;
        this.detail = this.product.name || '';
        this.price = this.product.localPrice || 0;
        this.subTotal = (this.quantity * this.price);
        this.product_id = this.product._id || '';
        this.order_id = order._id || '';
        this.isForCarry = order.isForCarry() || false;
        this.state = LineItemConstans.PENDING_STATE;
    }
};

LineItem.prototype.setOrderId = function (orderId) {
    this.order_id = orderId;
};

LineItem.prototype.removeReferences = function () {
    delete this.product;
};

LineItem.prototype.updateSubtotal = function () {
    if (this.price && this.quantity) {
        this.subTotal = this.price * this.quantity;
    } else {
        this.subTotal = 0;
    }
};

LineItem.prototype.updatePrice = function () {
    if (this.product && (this.product.outsidePrice && this.product.localPrice)) {
        this.price = this.isForCarry ? this.product.outsidePrice : this.product.localPrice;
    }
    this.updateSubtotal();
};

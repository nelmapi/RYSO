// Collection
Orders = new Mongo.Collection('Orders', {
    transform: function (order) {
        order.lineItems = LineItems.find({order_id: {$eq: order._id}});
        order.addItem = function (product) {
            Order.prototype.addItem.call(this, product);
        };
        order.updateTotal = function () {
            Order.prototype.updateTotal.call(this);
        };
    }
});

// Order Constans
OrderContans = {};

OrderContans.ON_TABLE_TYPE = 'Mesa';
OrderContans.TO_CARRY_TYPE = 'Llevar';
OrderContans.RESERVATION_TYPE = 'Reserva';

OrderContans.PENDING_STATE = 'Pendiente';
OrderContans.IN_PROGRESS_STATE = 'En Preparacion';
OrderContans.DELIVERED_STATE = 'Despachado';

OrderContans.DISHES_PENDING_STATE = 'Pendiente';
OrderContans.DISHES_IN_PROGRESS_STATE = 'En Curso';
OrderContans.DISHES_DELIVERED_STATE = 'Despachado';

OrderContans.BEVERAGES_PENDING_STATE = 'Pendiente';
OrderContans.BEVERAGES_IN_PROGRESS_STATE = 'En Curso';
OrderContans.BEVERAGES_DELIVERED_STATE = 'Despachado';

// JS Object

Order = function () {
    this.numOrder = '';
    this.type = OrderContans.ON_TABLE_TYPE;
    this.client = '';
    this.state = OrderContans.PENDING_STATE;
    this.dishesState = OrderContans.DISHES_PENDING_STATE;
    this.beveragesState = OrderContans.BEVERAGES_PENDING_STATE;
    this.comment = '';
    this.lineItems = {};
    this.total = 0;
};

Order.prototype.addItem = function (product) {
    if (this.lineItems[product._id]) {
        this.lineItems[product._id].quantity++;
        this.lineItems[product._id].updateSubtotal();
    } else {
        this.lineItems[product._id] = new LineItem(product, this);
    }
    console.log('addItem: ', this.lineItems[product._id]);
    this.updateTotal();
};

Order.prototype.updateTotal = function () {
    this.lineItems = this.lineItems || {};
    var result = 0;
    for (productId in this.lineItems) {
        result += this.lineItems[productId].subTotal;
    }
    this.total = result;
    console.log('updateTotal: ', this.total);
};

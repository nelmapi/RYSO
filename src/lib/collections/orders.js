// Collection
Orders = new Mongo.Collection('Orders', {
    transform: function (order) {
        return new Order(order);
    }
});

// Order Constans
OrderContans = {};

OrderContans.ON_TABLE_TYPE = 'Mesa';
OrderContans.TO_CARRY_TYPE = 'Llevar';
OrderContans.RESERVATION_TYPE = 'Reserva';

OrderContans.PENDING_STATE = 'Pendiente';
OrderContans.IN_PROGRESS_STATE = 'En Preparacion';
OrderContans.PREPARED_STATE = 'Preparado';
OrderContans.DELIVERED_STATE = 'Despachado';

OrderContans.DISHES_PENDING_STATE = 'Pendiente';
OrderContans.DISHES_IN_PROGRESS_STATE = 'En Curso';
OrderContans.DISHES_DELIVERED_STATE = 'Despachado';

OrderContans.BEVERAGES_PENDING_STATE = 'Pendiente';
OrderContans.BEVERAGES_IN_PROGRESS_STATE = 'En Curso';
OrderContans.BEVERAGES_DELIVERED_STATE = 'Despachado';

// JS Object

Order = function (order) {
    if (order) {
        _.extend(this, order);
    } else {
        this.numOrder = '';
        this.type = OrderContans.ON_TABLE_TYPE;
        this.client = '';
        this.state = OrderContans.PENDING_STATE;
        this.dishesState = OrderContans.DISHES_PENDING_STATE;
        this.beveragesState = OrderContans.BEVERAGES_PENDING_STATE;
        this.comments = '';
        this.reservation = false;
        this.tableNumber = '';
        this.total = 0;
    }

    this.$$lineItems = {};
};

Order.prototype.getRawOrder = function () {
    var rawOrder = {
        type: this.type,
        client: this.client,
        state : this.state,
        dishesState : this.dishesState,
        beveragesState : this.beveragesState,
        comments: this.comments,
        reservation : this.reservation,
        tableNumber: this.tableNumber,
        total: this.total
    };

    if (this._id) {
        rawOrder['_id'] = this._id;
    }

    return rawOrder;
};

Order.prototype.setLineItems = function (lineItems) {
    this.$$lineItems = lineItems;
};

Order.prototype.hasProductItem = function (productId) {
    return this.$$lineItems[productId] !== undefined;
};

Order.prototype.addItem = function (product) {

    var lineItem = null;
    if (this.hasProductItem(product._id)) {
        lineItem = this.$$lineItems[product._id];
        lineItem.quantity ++;
        lineItem.updateSubtotal();
    } else {
        lineItem = new LineItem(product, this);
        this.$$lineItems[product._id] = lineItem;
    }

    this.updateTotal();
    return lineItem;
};

Order.prototype.isNew = function () {
    return this._id === undefined;
};

Order.prototype.updateTotal = function () {
    var result = 0;
    this.forEachLineItem(function (lineItem) {
        result += lineItem.subTotal;
    });

    this.total = result;
};

Order.prototype.forEachLineItem = function (callback) {
    for (productId in this.$$lineItems) {
        callback(this.$$lineItems[productId]);
    }
};

Order.prototype.setReservation = function(reservation) {
    this.reservation = reservation;
};

Order.prototype.setAllLineItemsToCarry = function(toCarry) {
    this.forEachLineItem(function (lineItem) {
        lineItem.isForCarry = toCarry;
        lineItem.updatePrice();
    });
    this.updateTotal();
};

Order.prototype.serveInTable = function () {
    this.type = OrderContans.ON_TABLE_TYPE;
    this.setAllLineItemsToCarry(false);
};

Order.prototype.toCarry = function () {
    this.type = OrderContans.TO_CARRY_TYPE;
    this.setAllLineItemsToCarry(true);
};

Order.prototype.isServedInTable = function () {
    return this.type == OrderContans.ON_TABLE_TYPE;
};

Order.prototype.isForCarry = function () {
    return this.type == OrderContans.TO_CARRY_TYPE;
};

Order.prototype.isPending = function () {
    return this.state == OrderContans.PENDING_STATE;
};

Order.prototype.isInProgress = function () {
    return this.state == OrderContans.IN_PROGRESS_STATE;
};

Order.prototype.isPrepared = function () {
    return this.state == OrderContans.PREPARED_STATE;
};

Order.prototype.isDelivered = function () {
    return this.state == OrderContans.DELIVERED_STATE;
};

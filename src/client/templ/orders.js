Session.setDefault('currentOrderView', 'newOrder');

Template.orders.helpers({
    currentTabIs : function(tabName) {
        return Session.get('currentOrderView') === tabName;
    }
});

Template.orders.events({
    'click .newOrderBtn' : function(event, tmpl) {
        Session.set('currentOrderView', 'newOrder');
    },
    'click .orderListBtn' : function(event, tmpl) {
        Session.set('currentOrderView', 'orderList');
    },
    'click .ordersOverviewBtn' : function(event, tmpl) {
        Session.set('currentOrderView', 'ordersOverview');
    }
});
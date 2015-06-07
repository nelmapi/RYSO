// Routes

Router.route('/', function () {
    this.render('homePage');
});

Router.route('/products', function () {
    this.render('products');
});

Router.route('/orders', function () {
    this.render('orders');
});


// Template Helpers
Template.products.helpers({
    productList: function () {
        return Products.find();
    }
});;
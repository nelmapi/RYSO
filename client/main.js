// Routes

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    this.render('homePage');
});

Router.route('/products', function () {
    this.render('products');
});

Router.route('/orders', function () {
    this.render('orders');
});
// Routes

Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', function () {
    Session.set('currentPage', 'homePage');
    this.render('homePage');
});

Router.route('/products', function () {
    Session.set('currentPage', 'products');
    this.render('products');
});

Router.route('/orders', function () {
    Session.set('currentPage', 'orders');
    this.render('orders');
});

Router.route('/help', function () {
    Session.set('currentPage', 'help');
    this.render('help');
});

//Schema validation Messages

SimpleSchema.messages({
  required: "[label] es requerido",
  minString: "[label] debe contener por lo menos [min] caracteres",
  maxString: "[label] no puede exceder los  [max] caracteres",
  minNumber: "[label] debe ser como minimo [min]",
  maxNumber: "[label] no pude ser mas que [max]"
});
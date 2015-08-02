angular.module("ryso").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'client/partials/home.ng.html',
        controller: 'HomeController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'homePage');
        }
      })
      .state('products', {
        url: '/products',
        templateUrl: 'client/partials/products.ng.html',
        controller: 'ProductsController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'products');
        }
      })
      .state('orders', {
        url: '/orders',
        templateUrl: 'client/partials/orders.ng.html',
        controller: 'OrdersController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'orders');
        }
      })
      .state('help', {
        url: '/help',
        templateUrl: 'client/partials/help.ng.html',
        controller: 'HelpPageController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'help');
        }
      });

    $urlRouterProvider.otherwise("/");
  }]);
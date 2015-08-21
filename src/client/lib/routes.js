angular.module("ryso").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

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
      }).state('users', {
        url: '/users',
        templateUrl: 'client/partials/users.ng.html',
        controller: 'UsersController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'users');
        }
      }).state('reports', {
        url: '/reports',
        templateUrl: 'client/partials/reports.ng.html',
        controller: 'ReportsController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'reports');
        }
      }).state('login', {
        url: '/login',
        templateUrl: 'client/partials/login.ng.html',
        controller: 'LoginController',
        onEnter: function($stateParams) {
            Session.set('currentPage', 'login');
        }
      });

    $urlRouterProvider.otherwise("/");
  }
]).run(function ($rootScope, $location) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
        var loggedIn = Meteor.userId() !== null;
        if (!loggedIn) {
            $location.path('/login');
            $rootScope.initMenu();
        } else if (loggedIn && toState.name == 'login') {
            $location.path('/');
        }
    });
});

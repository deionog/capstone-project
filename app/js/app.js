'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'google-maps']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/compare', {templateUrl: 'partials/compare.html', controller: CompareCrtl})
    .when('/welcome', {templateUrl: 'partials/welcome.html', controller: WelcomeCrtl})
    .when('/start', {templateUrl: 'partials/start.html', controller: StartCrtl})
    .when('/search', {templateUrl: 'partials/search-city.html', controller: SearchCityCrtl})
    .when('/profile', {templateUrl: 'partials/profile.php', controller: ProfileCtrl})
    .when('/signup', {templateUrl: 'partials/signup.php', controller: SignUpCtrl})
    .otherwise({redirectTo: '/welcome'});
  }]);
  
 // Declare admin app level module: filters and services
 angular.module('myAppAdmin', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {templateUrl: 'AdminPartials/login.php', controller: AdminLoginCrtl})
    .when('/users', {templateUrl: 'AdminPartials/manageUsers.php', controller: AdminLoginCrtl})
    .when('/comments', {templateUrl: 'AdminPartials/manageComments.php', controller: AdminLoginCrtl})
    .otherwise({redirectTo: '/login'});
  }]);

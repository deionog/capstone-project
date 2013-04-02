'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'google-maps']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/compare', {templateUrl: 'http://localhost:8000/app/partials/compare.html', controller: CompareCrtl}).when('/welcome', {templateUrl: 'http://localhost:8000/app/partials/welcome.html', controller: WelcomeCrtl}).otherwise({redirectTo: '/welcome'});
  }]);

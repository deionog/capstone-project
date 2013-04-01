'use strict';

/* Controllers */

angular.module("myApp", []).config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/Compare', {
		templateUrl: '../compare.html',
		controller: 'CompareCrtl'
	});

}]);

function LoginForm($scope) {

	$scope.username = "";
	$scope.password = "";
	
	$scope.login = function() {
		window.alert("Yes that is how i FEEL!!");
	}; 
	
}

function MainCont($scope, $route, $routeParams, $location) {
	$scope.route = $route;
	$scope.routeParams = $routeParams;
	$scope.location = $location;
}

function CompareCrtl($scope, $routeParams) {
	$scope.name = "CompareCrtl";
	$scope.params = $routeParams;
}

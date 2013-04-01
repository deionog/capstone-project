'use strict';

/* Controllers */

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

function WelcomeCrtl($scope, $routeParams) {
	$scope.name = "CompareCrtl";
	$scope.params = $routeParams;
}

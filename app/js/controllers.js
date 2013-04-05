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
	
	angular.extend($scope, {
	center: {
		lat: 38, // initial map center latitude
		lng: -97 // initial map center longitude
	},
	markers: [], // an array of markers,
	zoom: 5 // the zoom level
	});
}

function WelcomeCrtl($scope, $routeParams) {
	$scope.name = "CompareCrtl";
	$scope.params = $routeParams;
}



'use strict';

/* Controllers */

function LoginForm($scope, $http) {

	$scope.username = "";
	$scope.password = "";
	
	$scope.login = function() {
		//$http.post('services/logintest.php', [{'uname':$scope.username, 'pwd':$scope.password}])
		
		$http({
		url:'services/login.php',
		data : {'uname':$scope.username, 'pwd':$scope.password},
		method : 'POST',
		headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	}).success(function(data,status){
		$scope.loginResults = data;
		$scope.status = status;
		if (status == 200) window.alert("Success");
		else window.alert("Failed");
		});
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



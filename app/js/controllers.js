'use strict';

/* Controllers */

function LoginForm($scope, $http) {

	$scope.username = "";
	$scope.password = "";
	$scope.state = "Login";
	
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
		if (status == 200) { 
			window.alert("Success");
			// Reload Window
			window.location = "http://www.deionlive.com/capstone/app/index.php";
		
		}
		else window.alert("Failed");
		});
	}; 
	
	$scope.logout = function(){
		$http({
		url:'services/logout.php',
		data : {},
		method : 'POST',
		headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
	}).success(function(data,status){
		$scope.loginResults = data;
		$scope.status = status;
		if (status == 200) { 
			window.alert("Logout Successful");
			window.location = "http://www.deionlive.com/capstone/app/index.php";
		}
		else window.alert("Error in Logging out");
		});
	}; 
	
}

function MainCont($scope, $route, $routeParams, $location) {
	$scope.route = $route;
	$scope.routeParams = $routeParams;
	$scope.location = $location;
}

function AdminCont($scope, $route, $routeParams, $location) {
	$scope.route = $route;
	$scope.routeParams = $routeParams;
	$scope.location = $location;
}

function CompareCrtl($scope, $routeParams) {
	
	//console.log(cities);
	$scope.name = "CompareCrtl";
	$scope.params = $routeParams;
	
	$scope.comparators = [1,2,3,4,5];
	
	angular.extend($scope, {
	center: {
		lat: 38, // initial map center latitude
		lng: -97 // initial map center longitude
	},
	markers: [], // an array of markers,
	zoom: 4 // the zoom level
	});
}

function WelcomeCrtl($scope, $routeParams) {
	$scope.name = "CompareCrtl";
	$scope.params = $routeParams;
	
	var randomData, t;
      randomData = function() {
        return Math.round(Math.random() * 25);
      };
      t = function() {
        return new Date().getTime();
      };
      $scope.dataLength = 8;
      $scope.data = [
        {
          time: t(),
          data: randomData()
        }
      ];
      return $scope.updateData = function() {
        $scope.data.push({
          time: t(),
          data: randomData()
        });
        if ($scope.data.length > $scope.dataLength) {
          return $scope.data.shift();
        }
      };
	
}

function StartCrtl($scope, $routeParams) {
	$scope.factors = [{name:"Cost of Living"},
					  {name:"Population"},
					  {name:"Crime rates"},
					  {name:"Employment Stats"},
					  {name:"Tax rates"},
					  {name:"Climate"},
					  {name:"Real estate values"}];
	
	$scope.comparators = [1,2,3,4,5];
	
	angular.extend($scope, {
	center: {
		lat: 38, // initial map center latitude
		lng: -97 // initial map center longitude
	},
	markers: [], // an array of markers,
	zoom: 4 // the zoom level
	});
		
	$scope.updateList = function(){
		$scope.city = "Start test";
		//console.log("Test");
	};
}


function SearchCityCrtl($scope, $routeParams) {
	$scope.stateName = "None Selected";
}

function ProfileCtrl($scope, $routeParams) {
	$scope.factors = [{name:"General"},
					  {name:"Saved Lists"},
					  {name:"Comments"}];
					  
	$scope.preferences = [{name:"Cost of Living"},
					  {name:"Population"},
					  {name:"Crime rates"},
					  {name:"Employment Stats"},
					  {name:"Tax rates"},
					  {name:"Climate"},
					  {name:"Real estate values"},
					  {name:"Yelp Searches"}];
}

function SignUpCtrl($scope, $routeParams) {
	
}

function AdminLoginCrtl($scope, $routeParams) {
	
}



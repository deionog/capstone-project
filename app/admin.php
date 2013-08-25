<?php
session_start();

	if (!empty($_SESSION['admin']) && !empty($_SESSION['user'])) {
		$user= $_SESSION['user'];

	}


?>

<!doctype html>
<html lang="en" ng-app="myAppAdmin">
<head>
  <meta charset="utf-8">
  <title>IdealSpot</title>
  <link rel="stylesheet" href="css/app.css"/>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
  <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Headland+One|Rufina:b&effect=shadow-multiple">
  <style>
  
  	.ui-autocomplete-loading {
    background: white url('img/ui-anim_basic_16x16.gif') right center no-repeat;
	}
  </style>
</head>
<body> 
	
	<header>
	<!-- Set up containers for Login and Registration Forms -->

	<!-- End of Login and Registration Forms -->
	
	<!-- Header containing logo and site navigation links -->
	
		<a href="#"><img class="logo" src="img/idealspot.png" alt="IdealSpot" /></a>
		
	</header>
	<!-- End of Header -->
	
	
  	
  <div ng-controller="AdminCont" class="main-content">
  
  <div ng-view></div>
  
  </div>
  
  <footer>
  <span>&copy;2013 Deion O'Garro</span>
  </footer>


  <!-- In production use:
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBUyh4iYVk_MpAiwzDNm5gnUkjzabJn8AU&sensor=false&language=en&libraries=places"></script>
  <script src="http://geoxml3.googlecode.com/svn/branches/polys/geoxml3.js"></script>
  <script src="http://geoxml3.googlecode.com/svn/trunk/ProjectedOverlay.js"></script>
  <script src="js/geomain.js"></script>
  <script src="lib/angular/angular.js"></script>
  <script src="js/app.js"></script>
  <script src="js/services.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/filters.js"></script>
  <script src="js/directives.js"></script>
  <script src="lib/angular/angular-resource.js"></script>
  <script src="js/angular-google-maps.js"></script>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="http://d3js.org/d3.geo.tile.v0.min.js"></script>
  <script src="http://d3js.org/topojson.v1.min.js"></script>
 
</body>
</html>

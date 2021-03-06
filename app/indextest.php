<?php
$user = "USERNAME";
	if (!empty($_SESSION['loggedn']) && !empty($_SESSION['user'])) {
		$user= $_SESSION['user'];

	}


?>


<!doctype html>
<html lang="en" ng-app="myApp">
<head>
  <meta charset="utf-8">
  <title>Relocator App</title>
  <link rel="stylesheet" href="css/app.css"/>
</head>
<body> 
  
  <div ng-controller="LoginForm" class="login-menu">
  <div>{{username = <?= $user ?>}}</div>
  <div class="sign-in"><a href="#">Preferences &nbsp;</a></div><div class="arrow-down"></div>
  <br>
  
  	<form name="UserLogin" class="login-form" ng-submit="login()">
  		<label>Username</label>
  		<input type="text" placeholder="username" ng-model="username" required/>
  		
  		<label>Password</label>
  		<input type="password" placeholder="password" ng-model="password" required/>
  		
      	<input type="submit" value="Login" name="Login" />
  	</form>
  	
  	<!--<h2>--- DEBUG VIEW ---</h2>
  	<p>Username: {{username}}</p>
  	<p>Password: {{password}}</p>
  	<p>Results:</p>
  	<p>{{status}}</p>
  	<pre>{{loginResults}}</pre>
  	-->
  	
  </div>
  
  <section class="header">
  	<a href="#/welcome"><img src="img/mylogo.png" /></a>
  	<a href="#/compare" class="menu-item">Compare Cities</a>
  </section>
  	
  <div ng-controller="MainCont" class="main-content">
  
  <div ng-view></div>
  
  </div>
  
  <footer>
  <span>&copy;2013 Deion O'Garro</span>
  </footer>


  <!-- In production use:
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"></script>
  -->
  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBUyh4iYVk_MpAiwzDNm5gnUkjzabJn8AU&sensor=false&language=en"></script>
  <script src="lib/angular/angular.js"></script>
  <script src="js/app.js"></script>
  <script src="js/services.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/filters.js"></script>
  <script src="js/directives.js"></script>
  <script src="lib/angular/angular-resource.js"></script>
  <script src="js/angular-google-maps.js"></script>
</body>
</html>

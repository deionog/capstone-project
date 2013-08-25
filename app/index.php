<?php
session_start();

	if (!empty($_SESSION['loggedIn']) && !empty($_SESSION['user'])) {
		$user= $_SESSION['user'];

	}


?>

<!doctype html>
<html lang="en" ng-app="myApp">
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
	
  	.land {
	  fill: #222;
	}

	.county-boundary {
	  fill: none;
	  stroke: #fff;
	  stroke-width: .5px;
	}

	.state-boundary {
	  fill: none;
	  stroke: #fff;
	}
	
	.background {
  	  fill: none;
  	  pointer-events: all;
	}

	#states {
	  fill: rgba(255,255,255,0.01);
	  stroke:#7D947C;
	  stroke-width: .5px;
	}

	#states .active {
	  fill: orange;
	}

	.highlight {
	  fill: #8FBCDB;
	  stroke: #fff;
	  stroke-width: 1.5px;
	}

	#counties {
		fill: #aaa;
		stroke: teal;
		stroke-width: 1px;
	}
	
	.stroke {
  fill: none;
  stroke: #000;
  stroke-width: .5;
}

.subunit {
  fill: none;
  stroke: #597a99;
  stroke-width: .5;
}

.state.hover {
  fill: rgba(255,255,255,0.50);
}

.subunit.natural-earth {
  fill: none;
}

.tooltip {
  position: absolute;
  background: rgba(200,200,200,0.75);
  border: 1px solid #ddd;
  padding: 5px 12px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(120,120,120,0.55);
  text-shadow: 0 1px 0 #eee;
}

.state-title {
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  </style>
</head>
<body> 
	
	<header>
	<!-- Set up containers for Login and Registration Forms -->
	<nav>
	 <ul>
	  <li id="login">
	   <a id="login-trigger" >
			<?php 
				if(!empty($user)) echo $user;
				else echo "Login <span>&#x25BC;</span>";
			?>
	   </a>
	   <div id="login-content" ng-controller="LoginForm">
		<?php
			if (!empty($user)) {
				echo '<fieldset id="inputs">
					<a ng-click="logout()" >Logout</a>
					<a href="#/profile">Account Settings</a>
				</fieldset>';
			} else {
		echo '<form name="UserLogin" ng-submit="login()" action="">
			<fieldset id="inputs">
				<input id="username" type="text" placeholder="joe@example.com" ng-model="username" required />
				<input id="password" type="password" placeholder="Password" ng-model="password" required />				
			</fieldset>
			
			<fieldset id="actions">
				<input id="submit" type="submit" value="Log in" />
				<label><input checked="checked" type="checkbox" /> Keep me signed in</label>				
			</fieldset>
		</form>';
			}
		?>
	   </div>
	  </li>
	  
	  <li id="signup">
	   <a href="#/signup">Sign up FREE!</a>
	  </li>
	 </ul>
	
	</nav>
	<!-- End of Login and Registration Forms -->
	
	
	<!-- Header containing logo and site navigation links -->
	
		<a href="#"><img class="logo" src="img/idealspot.png" alt="IdealSpot" /></a>
		<div id="nav">
			<a href="#/start">Compare Cities</a>
			<a href="#">About</a>
			<a href="#">Contact</a>
		</div>
	</header>
	<!-- End of Header -->
	
	
	
<!-- *** Old Header ***	
	
 <section id="header"> 
  <div ng-controller="LoginForm" class="login-menu">
  
  	<form name="UserLogin" class="login-form" ng-submit="login()">
  		<input type="text" placeholder="Username" ng-model="username" required/>
  		
  		<input type="password" placeholder="Password" ng-model="password" required/>
  		
      	<input type="submit" value="Login" name="Login" />
      	<input type="submit" value="Sign Up" name="signIn" />
  	</form>
  	
  </div>
  
  <section class="header">
  	<a href="#/welcome"><img src="img/idealspot.png" class="logo" /></a>
  	<ul class="menu">
  		<li><a href="#/compare" class="menu-item">Compare Cities</a></li>
  		<li><a href="#/welcome" class="menu-item">About</a></li>
  		<li><a href="#/welcome" class="menu-item">Contact</a></li>
  	</ul>
  </section>
  </section>
  
 -->
  	
  <div ng-controller="MainCont" class="main-content">
  
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
  <script>
	$(document).ready(function(){
	$('#login-trigger').click(function(){
		$(this).next('#login-content').slideToggle();
		$(this).toggleClass('active');					
		
		if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
			else $(this).find('span').html('&#x25BC;')
		})
	});
	</script>
</body>
</html>

<section id="search-opt" class="home-content">
	<h1>General Account Settings</h1>
	
	<hr class="divider">
	
	<div class="sidebar" id="sidebar">

	<ul class="factors">
		<li ng-repeat="factor in factors"><a href="#/{{factor.name}}"> {{factor.name}} </a></li>
	</ul>
	</div>
	
	
	
	<div class="settings">
		
		<form name="UpdateProfile" ng-submit="updateProfile()">
		<div class="gen-setting">
			<span><label class="gen-label">Email:</label><input type="email" ng-model="email" value="Current_User@mail.com" />
				<a id="email" href ng-click="updateEmail()" >Edit Email</a>
				<!--<input type="submit" name="emailUpdate" value="Update" /> -->
			</span>
		</div>
		
		<div class="gen-setting">
			<span><label class="gen-label">Password:</label><input type="password" ng-model="pwd" value="Current_User_Password" />
				<a id="pwd" href ng-click="updatePwd()" >Edit Password</a>
				<!--<input type="submit" name="pwdUpdate" value="Update" /> -->
			</span>
		</div>	
		</form>
			
		<h2>Preferences</h2>
	
		<div class="preferences">
			<ul class="prefs">
				<li ng-repeat="pref in preferences"><input type="checkbox" name="{{pref.name}}" /> {{pref.name}}</li>
			</ul>
		</div>
		
	</div>
	
	
	
	


	
</section>


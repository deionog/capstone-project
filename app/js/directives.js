(function() {
'use strict';

/* Directives */

var createSVG, updateBarAttr, updateGraph, updateTextAttr,myMap,myOptions;
var cities = [];			// Holds the cities selected by the user. 

var myAppDir = angular.module('myApp.directives', []);

  myAppDir.controller( 'CompareCrtl', function ($scope){
  	console.log("cities");
  });
  
  myAppDir.controller( 'MapCtrl', function ( $scope ) {
  	$scope.updateList = function() {
  		console.log("udate");
  		$scope.myCities = cities;
 		console.log($('#city1').val());
 		$('#city1').val("clear");
 		console.log($('#city1').val());
  	};
  });
  
  myAppDir.directive('scVisualization', function() {
    return { 
    	restrict: 'E',
      	scope: { val: '=' },
      	link: function(scope, element, attrs) {
			createSVG(scope, element);
			scope.$watch('val', updateGraph, true);
        }
    };
    }
  );
  
  /*
  	Directive to Handle Map functionality
  	- Handles populating list of cities user wishes to compare
  */
  myAppDir.directive('map', function() {
    return { 
    	restrict: 'E',
    	replace: true,
    	controller: 'MapCtrl',
    	template: '<div></div>',
      	link: function(scope, element, attrs, ctrl) {
			
			// Initial Map Options Setup
			 myOptions = {
				center: new google.maps.LatLng(38, -97),
				zoom: 4, // the zoom level
				mapTypeId : google.maps.MapTypeId.ROADMAP,
				scrollwheel: true,
        		streetViewControl: false,
        		mapTypeControl: false,
        		styles: [
					{
						stylers: [
							
							{ saturation: 0 }
						]
					},{
						featureType: "road",
						stylers: [
							{ visibility: "simplified" }
						]
					},{
						featureType: "poi",
						stylers: [
							{ visibility: "off" }
						]
					},{
						featureType: "water",
						elementType: "labels",
						stylers: [
							{ visibility: "off" }
						]
					}
				]
			};
			
		// Add options to map
		myMap = new google.maps.Map(document.getElementById(attrs.id), myOptions);
		
		// Get Element that contains user's city input
		var cityInput1 = (document.getElementById('city1'));
		
		// Set Options for places search (Restrict to US and type: Cities[regions])
    	var options = {
			  types: ['(regions)'],
			  componentRestrictions: {country: 'us'}
			};
    	
  		var autocomplete = new google.maps.places.Autocomplete(cityInput1,options);
  		
  		autocomplete.bindTo('bounds', myMap);
  		
  		var infowindow = new google.maps.InfoWindow();
		var marker = new google.maps.Marker({
			map: myMap
		  });
		 
		  google.maps.event.addListener(autocomplete, 'place_changed', function() {
  			
  			infowindow.close();
    marker.setVisible(false);
    cityInput1.className = '';
    
    var place = autocomplete.getPlace();
	
	// Update City List
	var addr = place.formatted_address;
	var str = addr.split(',')
		addr = str[0] +", " + str[1].substring(0,3);
	scope.$apply(updateCityList({'name': addr}));
	
	
    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      myMap.fitBounds(place.geometry.viewport);
    } else {
      myMap.setCenter(place.geometry.location);
      myMap.setZoom(5);  
    }
    marker.setIcon(({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    var html = '<div><strong>' + place.name + '</strong><br>' + address +
    '</div>';
    
    infowindow.setContent(html);
    infowindow.open(myMap, marker);
  		
  		});
	
						
        } // End of link statement
    };
    }); 

function updateCityList(newCity) {
	cities.push(newCity);
	
	//console.log(cities);
	var _scope = angular.element($('#sidebar')).scope();
	//_scope.city = newCity;
	//console.log(_scope.city);
	_scope.updateList();
	
	_scope.$apply(angular.element($("#city1")).val(""));
}

createSVG = function(scope, element) {
    scope.w = 400;
    scope.h = 200;
    if (!(scope.svg != null)) {
      return scope.svg = d3.select(element[0]).append("svg").attr("width", scope.w).attr("height", scope.h);
    }
};

updateGraph = function(newVal, oldVal, scope) {
    var bar, bars, existingBars, 
    	label, newBars, newLabels, 
    	textLabels, updateLabels, 
    	_i, _j, _len, _len1, 
    	_ref, _ref1, _results;
    	
    scope.xScale = d3.scale.ordinal()
    				 .domain(d3.range(newVal.length))
    				 .rangeRoundBands([0, scope.w], 0.05);
    				 
    scope.yScale = d3.scale.linear()
    				 .domain([0, d3.max(newVal, function(d) {
        				return d.data;
      				 })])
      				 .range([0, scope.h]);
      				 
    bars = scope.svg.selectAll("rect")
    			.data(newVal, function(d) { return d.time; });
    			
    existingBars = bars.transition().duration(200).ease("cubic-out");
    
    newBars = bars.enter()
    			  .append("rect")
    			  .transition()
    			  .delay(100)
    			  .duration(0)
    			  .ease("cubic-out")
    			  .attr("x", (newVal.length + 2) * scope.xScale.rangeBand());
    			  
    bars.exit().transition().duration(200)
    	.ease("cubic-out")
    	.attr("x", -scope.xScale.rangeBand())
    	.remove();
    	
    _ref = [existingBars, newBars];
    
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      bar = _ref[_i];
      updateBarAttr(bar, scope);
    }
    
    textLabels = scope.svg.selectAll("text").data(newVal, function(d) {
      return d.time;
    });
    
    updateLabels = textLabels.transition().duration(200).ease("cubic-out");
    
    newLabels = textLabels.enter().append("text")
    				.transition().delay(100).duration(0)
    				.ease("cubic-out")
    				.attr("x", (newVal.length + 2) * scope.xScale.rangeBand());
    				
    textLabels.exit().transition()
    		  .attr("x", -scope.xScale.rangeBand())
    		  .remove();
    		  
    _ref1 = [updateLabels, newLabels];
    
    _results = [];
    
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      label = _ref1[_j];
      _results.push(updateTextAttr(label, scope));
    }
    return _results;
  };

  updateBarAttr = function(bar, scope) {
    return bar.attr("x", function(d, i) {
      return scope.xScale(i);
    }).attr("y", function(d) {
      return scope.h - scope.yScale(d.data);
    }).attr("width", scope.xScale.rangeBand()).attr("height", function(d) {
      return scope.yScale(d.data);
    }).attr("fill", function(d) {
      return "rgb(0, 0, " + (d.data * 10) + ")";
    });
  };

  updateTextAttr = function(label, scope) {
    return label.text(function(d) {
      return d.data;
    }).attr("x", function(d, i) {
      return scope.xScale(i) + scope.xScale.rangeBand() / 2;
    }).attr("y", function(d) {
      return scope.h - scope.yScale(d.data) + 15;
    }).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "8px").attr("fill", "white");
  };
  
  
  
  /* D3js Modules and Controller Setup*/
  
  //Controller to handle business logic
  myAppDir.controller('D3Ctrl', function($scope, $http) {
  	$scope.place = "1";
  	console.log(cities);
    
    $http({
      method: 'GET',
      url:'http://deionlive.com/capstone/app/services/stats.php'
    }).
    success(function (data) {
      // attach this data to the scope
      $scope.data = data;
      console.log(data);
      
      // clear the error messages
      $scope.error = '';
    }).
    error(function (data, status) {
      if (status === 404) {
        $scope.error = 'Failed to retrieve City information';
      } else {
        $scope.error = 'Error: ' + status;
      }
    });

  	
  	
  });
  
  myAppDir.directive('ghVisualization', function() {
  
  	var margin = {top: 60, right: 60, bottom: 120, left: 120},
    width = 600 - margin.left- margin. right,
    height = 400 - margin.top - margin.bottom,
    barPadding = 1;

  	return {
    	restrict: 'E',
    	scope: {
      		val: '='
    	},
    	controller: 'D3Ctrl',
    	link: function (scope, element, attrs) {
    		var vis = d3.select(element[0])
        				.append("svg")
          				.attr("width", width + margin.left + margin.right)
          				.attr("height", height + margin.bottom + margin.top)
          				.append("g")
          				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          	
          	var str = new Array();
          	
          	for (var i =0; i < cities.length; i++) {
          		str[i] = cities[i].name;		
          	}
          	
          	
          	populationGraph(vis,width,height,barPadding,margin,str);
          	crimeRateGraph();
          	employmentGraph();			
          	/*scope.$watch('val', function (newVal, oldVal) {

        	// clear the elements inside of the directive
        	vis.selectAll('*').remove();

        	// if 'val' is undefined, exit
        	if (!newVal) {
          		return;
        	}
        	var x = d3.scale.linear().range([0, width]),
    			y = d3.scale.ordinal().rangeRoundBands([0, height], .1);

			var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h),
    			yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
        	
        	var data = newVal;
        	
        	var layers = vis.selectAll("g.layer")
            .data(data)
          .enter().append("g")
            .style("fill", function(d, i) {
              return color(i / (10 - 1));
            })
            .attr("class", "layer");
            
        	var bars = layers.selectAll("g.bar")
            .data(function(d) { return d; })
          	.enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) {
              return "translate(" + x(d) + ",0)";
            });

				bars.append("rect")
					.attr("width", x({x: .9}))
					.attr("x", 0)
					.attr("y", height)
					.attr("height", 0);

        	
        	});// end scope watch */
    	}
  	}
  });
  
  function populationGraph(vis,width,height,barPadding,margin,urlStr) {
  	
  	//var urlStr = cities.name.join("&");
  	var str = urlStr.join("$");
  	console.log(str);
  	  	
  	d3.json("http://deionlive.com/capstone/app/services/stats.php?cities=" + str, function(json){
          	
          		var xScale = d3.scale.ordinal()
          						.domain(json.map(function(d){return d.NAME;}))
          						.rangeRoundBands([0, width], 0.05);
          		
          		var yScale = d3.scale.linear()
          						.domain([0, d3.max(json, function(d){return d.POP;})])
          						.range([height, 0]);
          						
          		//Create X Axis	
				var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom");
								   
				//Create Y Axis
				var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient('left');
          		
          		// Append the X Axis
          		vis.append("g")
				   .attr("class", "axis x")
				   .attr("transform", "translate(0," + height + ")")
				   .call(xAxis)
				   .selectAll("text")
				   .style("text-anchor", "end")
				   .attr("transform", function(d){ return "rotate(-65)"; });
				   
				// Create Chart Title
				vis.append("text")
					.attr("x", width / 2 )
					.attr("y", -10)
					.style("text-anchor", "middle")
					.style("font-size", "14px")
					.text("Population");
					
				//Create X axis label   
				/*svg.append("text")
					.attr("x", w / 2 )
					.attr("y",  h + margin.bottom)
					.style("text-anchor", "middle")
					.text("X Label");*/
				   
				//Create Y axis
				vis.append("g")
				   .attr("class", "axis y")
				   .call(yAxis);
				   
				//Create Y axis label
				/*svg.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0-margin.left)
					.attr("x",0 - (h / 2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.text("Y Label");*/
          		
          		// Add rectangles
          		vis.selectAll("rect")
          		  .data(json)
          		  .enter()
          		  .append("rect")
          		  .attr('x', function(d){return xScale(d.NAME);})
          		  .attr('y', function(d){return yScale(d.POP);})
          		  .attr('width', xScale.rangeBand())
          		  .attr('height', function(d){ return height - yScale(d.POP); })
          		  .attr('fill', function(d){ return "rgb(200, 90, " + d.POP % 100 + ")";});
          		  
          	});
          	
          	
  }
  
  function costOfLiving() {
  	
  }
  
  
  /**
  	@functionName crimeRates
  	@desc Retrieves the crime rate for each city that was selected by the user on the start
  		  page and displays the data to the appropriate container.
  **/
  function crimeRateGraph() {	
  	
  	for (var i =0; i < cities.length; i++) {
  		
  		var city = cities[i].name.split(",");     //replace(/ /g,'');
  		//console.log(city);
  		var url = "/capstone/app/services/crimeRate.php?city="+ city[0] + "&state=" + $.trim(city[1]) ;
  		$.getJSON( url, function(json){
  			
  			$('#crime_rate').append("<h3>" + json.city + "</h3><br><img src='" + json.src[0] + "' /><br>");
  			console.log(url);
  			console.log(json.src[0]);
  		});
  		
  	}// end foreach
  
  }
  
  function employmentGraph() {
  	
  	// Build Url String
  	//var cityList = cities.name.join("%20vs%20");
  	var end = cities.length;
  	var temp = "";
  	
  	for (var i =0; i < end ; i++) {
  		if(i == (end-1)){
  			temp += cities[i].name;
  		} else {
  			temp += cities[i].name + "%20vs%20";
  		}
  	}
  	
  	var url = "/capstone/app/services/employment.php?search="+ temp;
  	console.log("URL: " + url);
  	
  	// Parse and display results
  	$.getJSON( url, function(json){
  			
  			$('#emp_stats').append("<img src='" + json.src[0] + "' /><br>");
  			//$('#crime_rate').append("<h3>Crime Rates History</h3><br><img src='" + json.src[0] + "' /><br>");
  			console.log(url);
  			console.log(json.src[0]);
  	});
  	
  }
  
  function zillowContent() {
  	
  }
  
  function yelpContent() {
  	
  }
  
  function taxStatGraph() {
  	
  }
  
  function climateGraph() {
  	
  }
  

}).call(this);
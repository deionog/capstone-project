var wasZoomed = false;
var geoXml = null;
var geoXmlDoc = null;
var map = null;
var myLatLng = null;
var myGeoXml3Zoom = false;
var sidebarHtml = "";
var infowindow = null;
var kmlLayer = null;
var countyUrl = "";
var filename = "http://deionlive.com/capstone/US_Regions_State_Boundaries.kml";

function initialize() {
      myLatLng = new google.maps.LatLng(37.422104808,-122.0838851);
      // these set the initial center, zoom and maptype for the map 
      // if it is not specified in the query string
      var lat = 38;
      var lng = -97;
      var zoom = 4;
      var maptype = google.maps.MapTypeId.ROADMAP;

      // If there are any parameters at eh end of the URL, they will be in  location.search
      // looking something like  "?marker=3"
 
      // skip the first character, we are not interested in the "?"
      var query = location.search.substring(1);
 
      // split the rest at each "&" character to give a list of  "argname=value"  pairs
      var pairs = query.split("&");
      for (var i=0; i<pairs.length; i++) {
        // break each pair at the first "=" to obtain the argname and value
	var pos = pairs[i].indexOf("=");
	var argname = pairs[i].substring(0,pos).toLowerCase();
	var value = pairs[i].substring(pos+1).toLowerCase();
 
        // process each possible argname  -  use unescape() if theres any chance of spaces
        if (argname == "id") {id = unescape(value);}
        if (argname == "filename") {filename = unescape(value);}
        if (argname == "marker") {index = parseFloat(value);}
        if (argname == "lat") {lat = parseFloat(value);}
        if (argname == "lng") {lng = parseFloat(value);}
        if (argname == "zoom") {
	  zoom = parseInt(value);
	  myGeoXml3Zoom = false;
	}
        if (argname == "type") {
// from the v3 documentation 8/24/2010
// HYBRID This map type displays a transparent layer of major streets on satellite images. 
// ROADMAP This map type displays a normal street map. 
// SATELLITE This map type displays satellite images. 
// TERRAIN This map type displays maps with physical features such as terrain and vegetation. 
          if (value == "m") {maptype = google.maps.MapTypeId.ROADMAP;}
          if (value == "k") {maptype = google.maps.MapTypeId.SATELLITE;}
          if (value == "h") {maptype = google.maps.MapTypeId.HYBRID;}
          if (value == "t") {maptype = google.maps.MapTypeId.TERRAIN;}

        }
      }
      if (!isNaN(lat) && !isNaN(lng)) {
        myLatLng = new google.maps.LatLng(lat, lng);
      }
                var myOptions = {
                    zoom: zoom,
                    center: myLatLng,
                    // zoom: 5,
                    // center: myLatlng,
                    mapTypeId: maptype
                };
                map = new google.maps.Map(document.getElementById("map_canvas"),
                      myOptions);
                infowindow = new google.maps.InfoWindow({});

   geoXml = new geoXML3.parser({
                    map: map,
                    infoWindow: infowindow,
                    singleInfoWindow: true,
		    zoom: myGeoXml3Zoom,
		    markerOptions: {optimized: false},
                    afterParse: useTheData
                });
                geoXml.parse(filename);
		//google.maps.event.addListener(map, "bounds_changed", makeSidebar);
		//google.maps.event.addListener(map, "center_changed", makeSidebar);
		google.maps.event.addListener(map, "zoom_changed", resetLayer);
      // Make the link the first time when the page opens
      //makeLink();

      // Make the link again whenever the map changes
     // google.maps.event.addListener(map, 'maptypeid_changed', makeLink);
      //google.maps.event.addListener(map, 'center_changed', makeLink);
      //google.maps.event.addListener(map, 'bounds_changed', makeLink);
      //google.maps.event.addListener(map, 'zoom_changed', makeLink);
      
      //$('.loader-image').toggle();
}

function resetLayer() {
	if (map.getZoom() < 5 && wasZoomed){
		wasZoomed = false;
		map.setOptions({draggable:true});
		resetCounty();
		
		geoXml.showDocument(geoXml.docs[0]);
		//geoXmlDoc = null;
		//geoXml.parse(filename); 
	}
}

function resetCounty() {
	for (var i=0;i<geoXml.docs.length;i++) {	
			if(geoXml.docs[i].baseUrl == countyUrl){
				geoXml.hideDocument(geoXml.docs[i]);
				console.log(geoXml.docs[i]);
			} else {
				console.log("URL not found");
			}
		}
}

function kmlPgClick(pm) {
   if (geoXml.docs[0].placemarks[pm].polygon.getMap()) {
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polygon,"click");
   } else {
      geoXmlDoc.placemarks[pm].polygon.setMap(map);
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polygon,"click");
   }
}
function kmlPlClick(pm) {
   if (geoXml.docs[0].placemarks[pm].polyline.getMap()) {
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polyline,"click");
   } else {
      geoXmlDoc.placemarks[pm].polyline.setMap(map);
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].polyline,"click");
   }
}
function kmlClick(pm) {
   if (geoXml.docs[0].placemarks[pm].marker.getMap()) {
      google.maps.event.trigger(geoXml.docs[0].placemarks[pm].marker,"click");
   } else {
      geoXmlDoc.placemarks[pm].marker.setMap(map);
      google.maps.event.trigger(geoXmlDoc.placemarks[pm].marker,"click");
   }
}
function kmlShowPlacemark(pm) {
  if (geoXmlDoc.placemarks[pm].polygon) {
    map.fitBounds(geoXmlDoc.placemarks[pm].polygon.bounds);
  } else if (geoXmlDoc.placemarks[pm].polyline) {
    map.fitBounds(geoXmlDoc.placemarks[pm].polyline.bounds);
  } else if (geoXmlDoc.placemarks[pm].marker) {
    map.setCenter(geoXmlDoc.placemarks[pm].marker.getPosition());
  } 
   
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (i == pm) {
       if (placemark.polygon) placemark.polygon.setMap(map);
       if (placemark.polyline) placemark.polyline.setMap(map);
       if (placemark.marker) placemark.marker.setMap(map);
     } else {
       if (placemark.polygon) placemark.polygon.setMap(null);
       if (placemark.polyline) placemark.polyline.setMap(null);
       if (placemark.marker) placemark.marker.setMap(null);
     }
   }
}

function kmlColor (kmlIn) {
  var kmlColor = {};
  if (kmlIn) {
   aa = kmlIn.substr(0,2);
   bb = kmlIn.substr(2,2);
   gg = kmlIn.substr(4,2);
   rr = kmlIn.substr(6,2);
   kmlColor.color = "#" + rr + gg + bb;
   kmlColor.opacity = parseInt(aa,16)/256;
  } else {
   // defaults
   kmlColor.color = randomColor();
   kmlColor.opacity = 0.45;
  }
  return kmlColor;
}

function randomColor(){ 
  var color="#";
  var colorNum = Math.random()*8388607.0;  // 8388607 = Math.pow(2,23)-1
  var colorStr = colorNum.toString(16);
  color += colorStr.substring(0,colorStr.indexOf('.'));
  return color;
};

var highlightOptions = {fillColor: "#055166", strokeColor: "#ffffff", fillOpacity: 0.3, strokeWidth: 10};
var highlightLineOptions = {strokeColor: "#FFFF00", strokeWidth: 10};
function kmlHighlightPoly(pm) {
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (i == pm) {
       if (placemark.polygon) placemark.polygon.setOptions(highlightOptions);
       if (placemark.polyline) placemark.polyline.setOptions(highlightLineOptions);
     } else {
       if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
       if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
     }
   }
}
function kmlUnHighlightPoly(pm) {
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     if (i == pm) {
       var placemark = geoXmlDoc.placemarks[i];
       if (placemark.polygon) placemark.polygon.setOptions(placemark.polygon.normalStyle);
       if (placemark.polyline) placemark.polyline.setOptions(placemark.polyline.normalStyle);
     }
   }
}


function showAll() {
   map.fitBounds(geoXmlDoc.bounds);
   for (var i=0;i<geoXmlDoc.placemarks.length;i++) {
     var placemark = geoXmlDoc.placemarks[i];
     if (placemark.polygon) placemark.polygon.setMap(map);
     if (placemark.polyline) placemark.polyline.setMap(map);
     if (placemark.marker) placemark.marker.setMap(map);
   }
}

function highlightPoly(poly, polynum, place) {
  //    poly.setOptions({fillColor: "#0000FF", strokeColor: "#0000FF", fillOpacity: 0.3}) ;
  google.maps.event.addListener(poly,"mouseover",function() {
    var rowElem = document.getElementById('row'+polynum);
    if (rowElem) rowElem.style.backgroundColor = "#FFFA5E";
    if (poly instanceof google.maps.Polygon) {
      poly.setOptions(highlightOptions);
    } else if (poly instanceof google.maps.Polyline) {
      poly.setOptions(highlightLineOptions);
    }
  });
  google.maps.event.addListener(poly,"mouseout",function() {
    var rowElem = document.getElementById('row'+polynum);
    if (rowElem) rowElem.style.backgroundColor = "#FFFFFF";
    poly.setOptions(poly.normalStyle);
  });
  google.maps.event.addListener(poly,"click", function() {
  	//resetCounty();
  	$('.loader-image').toggle();

  	map.setZoom(6);
  	wasZoomed = true;
  	map.setOptions({draggable:false});
  	//hide_kmlLayer();
  	$.getJSON('../states.json', function(data){
  		$.each(data.states, function(key, val) {	
  			if (val.stateName == place.name){
  				var currlatlng = new google.maps.LatLng(val.lat, val.lon);
  				map.setCenter(currlatlng);
  			console.log("You need the file:" + val.fileName);
  			geoXml.hideDocument(geoXml.docs[0]);
  			countyUrl = "http://deionlive.com/capstone/Counties by State/" + val.fileName;
  			geoXml.parse(countyUrl);
  			
  			}
  		});
  	});
  	console.log(place.name);
  	$('.loader-image').toggle();
  	//geoXml.parse("http://deionlive.com/capstone/UScounties.kml");
  });
}  


function useTheData(doc){
  var currentBounds = map.getBounds();
  if (!currentBounds) currentBounds=new google.maps.LatLngBounds();
  // Geodata handling goes here, using JSON properties of the doc object
 // sidebarHtml = '<table><tr><td><a href="javascript:showAll();">Show All</a></td></tr>';
//  var sidebarHtml = '<table>';
  geoXmlDoc = doc[0];
  for (var i = 0; i < geoXmlDoc.placemarks.length; i++) {
    // console.log(doc[0].markers[i].title);
    var placemark = geoXmlDoc.placemarks[i];
    if (placemark.polygon) {
      
      var kmlStrokeColor = kmlColor(placemark.style.color);
      var kmlFillColor = kmlColor(placemark.style.fillcolor);
      var normalStyle = {
          strokeColor: kmlStrokeColor.color,
          strokeWeight: placemark.style.width,
          strokeOpacity: kmlStrokeColor.opacity,
          fillColor: kmlFillColor.color,
          fillOpacity: kmlFillColor.opacity
          };
      placemark.polygon.normalStyle = normalStyle;

      highlightPoly(placemark.polygon, i, placemark);
    }
    if (placemark.polyline) {
      
      var kmlStrokeColor = kmlColor(placemark.style.color);
      var normalStyle = {
          strokeColor: kmlStrokeColor.color,
          strokeWeight: placemark.style.width,
          strokeOpacity: kmlStrokeColor.opacity
          };
      placemark.polyline.normalStyle = normalStyle;

      highlightPoly(placemark.polyline, i);
    }
    if (placemark.marker) {
      if (currentBounds.contains(placemark.marker.getPosition())) {
         makeSidebarEntry(i);
      }
    }

/*    doc[0].markers[i].setVisible(false); */
  }
  //sidebarHtml += "</table>";
  //document.getElementById("sidebar").innerHTML = sidebarHtml;
};  

   function hide_kml(){

            geoXml.hideDocument();  

   }

   function unhide_kml(){

            geoXml.showDocument();  

   }

  
   
   function load_kmlLayer() {
     kmlLayer = new google.maps.KmlLayer(filename);
     google.maps.event.addListener(kmlLayer, "status_changed", function() {
       document.getElementById('kmlstatus').innerHTML = "Kml Status:"+kmlLayer.getStatus();
     });
     kmlLayer.setMap(map);
   }
   function hide_kmlLayer() {
     kmlLayer.setMap(null);
   }
   function show_kmlLayer() {
     kmlLayer.setMap(map);
   }

var map,
	county_layer1,
	county_layer2;
	
function initialize() {

	infoWindow = new google.maps.InfoWindow();

    map = new google.maps.Map(document.getElementById('map_canvas'), {
        center: new google.maps.LatLng(38, -97),
        zoom: 5,
        scrollwheel: false,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    map.setOptions({
        styles: [
            {
                stylers: [
                    { saturation: -100 }
                ]
            },{
                featureType: "road",
                stylers: [
                    { visibility: "off" }
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
    });
    
    // Initialize First Layer of Counties
    county_layer1 = new google.maps.FusionTablesLayer({
        query: {
            select: 'geometry',
            from: '1bt98zxaQcCcxgYnQB0n7edRTSl28qpsoNusFAwo'
        },
        suppressInfoWindows:true
    });

    county_layer1.setMap(map);

    // Initialize Empty Second Layer to contain Private Schools later
    county_layer2 = new google.maps.FusionTablesLayer({
		query: {
            select: 'geometry',
            from: '1MzwxY87EdI8Z5FT5vAIKb8qhgP_v355P2Gp97Y4'
        },
        suppressInfoWindows:true
    });

    county_layer2.setMap(map);


}

google.maps.event.addDomListener(window, 'load', initialize);
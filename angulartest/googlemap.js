angular.module( 'googleMapApp', [ 'uiGmapgoogle-maps' ] )
	.config( function( uiGmapGoogleMapApiProvider ) {
		uiGmapGoogleMapApiProvider.configure( {
			//    key: 'your api key',
			v: '3.20', //defaults to latest 3.X anyhow
			libraries: 'weather,geometry,visualization'
		} );
	} )
	.value("googleMaps", {})
.controller('googleMapController', function($rootScope,$scope, uiGmapGoogleMapApi, uiGmapIsReady, googleMaps){
	uiGmapGoogleMapApi.then(function(maps){
		var directionsService = new maps.DirectionsService();
		googleMaps = maps;
	});


	var marker1 = {
		"id": 1,
		"latitude": 45,
		"longitude": -74,
		"showWindow": false,
		// icon:'/angulartest/images/abc.png',//http://localhost:28565/angulartest/images/abc.png
		"options": {
			"draggable": true,
			"animation": 1,
			"labelContent": "Markers id 1",
			"labelAnchor": "22 0",
			"labelClass": "marker-labels"
		}
	}
	var marker2 = {
		"id": 2,
		"latitude": 15,
		"longitude": 30,
		"showWindow": false
	}
	var marker3 = {
		"id": 3,
		"latitude": 37,
		"longitude": -122,
		"showWindow": false,
		"title": "Plane",
		"options": {
			"labelContent": "Markers id 3",
			"labelAnchor": "26 0",
			"labelClass": "marker-labels"
		}
	}

	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	// $scope.map.markers = [marker1, marker2, marker3];
	$scope.map.markers = [];

	for (var i = 0; i < 5;i++) {
	// 	var marker = {
	// 	"id": i,
	// 	"coords":{

	// 	"latitude": 15,
	// 	"longitude": 30 + i
	// 	}
	// }
	// 
		var marker = {
			"id": i,
			
			"latitude": 15,
			"longitude": 30 + i,
			"showWindow": false,
			// "events": {
			// 	mouseover : ( function( marker, eventName, args ) {
			// 		alert( "123" );
			// 	} )
			// }
			options:{
				draggable:true
			}
		}


		$scope.map.markers.push(marker);
	};
// $scope.map.markers = [marker1, marker2, marker3];
	alert($scope.map.markers.length);
});
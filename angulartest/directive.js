var lodash1 = angular.module('loadash', []);

lodash1.factory('_', function() {
  return window._; });



var app = angular.module("directiveApp",['uiGmapgoogle-maps', 'ngDragDrop', "loadash"]);

app.factory('DataProvideService',  function($http){
	return {
		aa:'123213'
	}
});

app.controller('directiveController', ['$scope','DataProvideService', '_' ,function($scope, DataProvideService, _){
	var lll = _;

	var marker1 = {
		"id": 1,
		"latitude": 45,
		"longitude": -74,
		"showWindow": false,
		icon: '/angulartest/images/abc.png', //http://localhost:28565/angulartest/images/abc.png
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

	var tmp1 = {
		Name: 'zhangsen',
		Age: '18',
		Arr: [ {
			A: "a",
			B: "b"
		}, {
			A: '123',
			B: "456"
		} ],
		top:0,
		left:0
	};

	var tmp2 = {
		Name: 'LiSi',
		Age: '30',
		Arr: [ {
			A: "JK",
			B: "OP"
		}, {
			A: '980',
			B: "876"
		} ],
		top:0,
		left:500
	};

	$scope.Data = {
		List:[tmp1, tmp2],
		map: {
			center: {
				latitude: 45,
				longitude: -73
			},
			zoom: 8,
			bounds: {},
			options:{
				scrollwheel:false
			}
		}
	};

	$scope.Data.map.markers = [marker1,marker2,marker3];

	// $scope.$watch( function() {
	// 	return $scope.Data.map.bounds;
	// }, function( nv, ov ) {
	// 	if ( !ov.southwest && nv.southwest ) {
	// 		var markers = [];
	// 		for ( var i = 0; i < 50; i++ ) {
	// 			markers.push( createRandomMarker( i, $scope.Data.map.bounds ) )
	// 		}
	// 		$scope.Data.map.markers = markers;
	// 	}
	// }, true );
}]);

app.controller('routeListController', ['$scope',function($scope){
	$scope.routeclick = function(data){
		alert(data.Age);
	};
}]);

app.controller('stopListController', ['$scope',function($scope){
	$scope.stopclick = function(data) {
		alert( data.Name );
		data.Age = 2200;
		data.Arr.push({A:'我是添加的真是屌呀',B:'789'});
		
	};


	 $scope.$watchCollection ('Data.Arr',function(new1,old, ooo){
                                var dddddd= new1;
              })
}]);



app.directive('routelist', function(){
	return {
		restrict:"E",
		templateUrl:"template/a.html",
		 replace: true,
		 link:function(scope, element, attr){
		 	element.bind("click", function(event){
		 		scope.$apply(attr.routeclick);
		 	});
		 }
	};
});


app.directive('stopcontainer', function(){
	return {
		restrict:'E',
		templateUrl:'template/b.html',
		replace:true,
		 link:function(scope, element, attr){
		 	element.bind("click", function(event){
		 		scope.$apply(attr.stopclick);
		 		event.stopPropagation();
		 	});
		 }
	}
});



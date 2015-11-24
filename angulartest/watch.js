angular.module("watchApp", [])
.controller('watchController', function($scope){
	$scope.a = 1;
	$scope.b = 1;
	$scope.c = 1;
	$scope.data = {
		k:1
	};

	$scope.$watch( "b", function() {
		$scope.c = $scope.b + 1
	} );
		
	$scope.$watch("a", function(){
		$scope.b = $scope.a + 1;
	});


})

.controller('childController', ['$scope', function($scope){
	$scope.clickme = function(){
		$scope.data.k = 110;
	}
}])
angular.module('seedApp.controller', ['seedApp.services'])

.controller('seedController',["$scope","helperService", function($scope,helperService){
	$scope.Name = 'zhangsen';
}]);
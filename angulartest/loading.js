angular.module("loadingApp", ['angular-loading-bar', 'ngAnimate', 'ngDialog'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  	 cfpLoadingBarProvider.includeSpinner = false;
  	  // cfpLoadingBarProvider.includeBar = false;
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

    cfpLoadingBarProvider.parentSelector = '#loader';
  }])
.controller('loadingController', ['$scope','cfpLoadingBar','ngDialog', function($scope, cfpLoadingBar, ngDialog){
$scope.Name = "123";
$scope.open = function(){
		ngDialog.open( {
			template: '<div id="loader1"  width: 900px; height:50px; ">',
			plain: true,
			showClose:false
		} );
}

$scope.masked = true;

cfpLoadingBar.start();

cfpLoadingBar.inc();

cfpLoadingBar.set(0.1) 
setTimeout(function(){
	cfpLoadingBar.complete()
}, 1000);

cfpLoadingBar.complete = function(){
	$scope.masked = false;
}



  
}])

.directive('loading', function(){
	var directive = {
		restrict: "E",
		scope: currentScope,
		template:"<span>{{route.Route}} , {{rootjson.ShowZeroInvoices}}<span>",
		replace: true,
		link: linkFunc
	};
	return directive;
})


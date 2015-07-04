var app = angular.module('nuplae', ['sharedModule', 'consoleModule', 'nuplaeModule', 'accelModule', 'ngRoute']);

var desktopdebug = true;

app.config(function($routeProvider) {
    $routeProvider.

      when('/invalid', {
      
        templateUrl: 'features/nuplae/invalid.html'

      }).
      when('/valid', {
      
        templateUrl: 'features/nuplae/valid.html',
        controller:'nuplaeCtrl',
        controllerAs:'main'
      }).
      otherwise("/checking", {

      	templateUrl:'features/nuplae/checking.html'
      });
}).
run(function ($location, validate) {

	var self = this;

  if (!desktopdebug) {
    	var isValid = validate.run();

    	isValid.then(	
    	function (path) {
    		$location.path(path);
    	},
    	function (path) {
    		$location.path(path);
    	});
  }
  else {
      $location.path("/invalid");
  }

});
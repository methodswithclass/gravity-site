var app = angular.module('nuplae', ['shared-module', 'accel-module', 'console-module', 'ngRoute']);

var mobiledebug = false;

app.config(function($routeProvider) {
    $routeProvider.

      when('/invalid', {
      
        templateUrl: 'views/invalid.html'

      }).
      when('/valid', {
      
        templateUrl: 'views/valid.html'
      }).
      otherwise("/checking",{

      	templateUrl:'views/checking.html'
      });
}).
run(function ($location, validate) {

	var self = this;

	var isValid = validate.run();

	isValid.then(	
	function (path) {
		$location.path(path);
	},
	function (path) {
		$location.path(path);
	});


});
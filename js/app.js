var app = angular.module("methodswithclass", ['ngRoute']);

var mobiledebug = false;

app.config(function($routeProvider) {
    $routeProvider.
      //Display desktop version
      when('/desktop', {
        //Template for Desktop based browsers
        templateUrl: 'views/desktop.html'
      }).
      //Display mobile version
      when('/mobile', {
        //Template for Mobile based browsers
        templateUrl: 'views/mobile.html'
      })
}).
run(function ($location) {

	var production;

	if(whatDevice() == mobile) {

		production = "/mobile";
	}
	else {

		if (mobiledebug) {
			production = "/mobile";
		}
		else {
			production = "/desktop";
		}
	}

	$location.path(production);
});
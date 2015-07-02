var app = angular.module('nuplae', ['shared-module', 'accel-module', 'console-module', 'ngRoute']);

var mobiledebug = false;

app.config(function($routeProvider) {
    $routeProvider.

      when('/invalid', {
      
        templateUrl: '/views/invalid.html'
      }).

      when('/valid', {
      
        templateUrl: '/views/valid.html'
      }).

      otherwise("/checking",{

      	templateUrl:'/views/checking.html'
      });
}).
run(function (validate, events, $location) {

	var self = this;

	var time = 0;

	var hasValidated = {};

	validate.run();

	var setLocation = function (location, route) {

		console.log("route is " + route);

		location.path(route);
	}

	var check = function (location) {

		self.timer = setInterval(function () {

			time += 10;

			hasValidated = events.dispatch('validate');

			if (time > 1000 || hasValidated.done) {
				clearInterval(self.timer);
				validate.stop();
				setLocation(location, hasValidated.route);
			}

		}, 10);

	}

	check($location);

});
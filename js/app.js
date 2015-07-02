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
run(function ($location, validate, events) {

	var isValid = {};
	var time = 0;
	this.timer;

	var changePath = $location.path;

	var check = function () {

		self.timer = setInterval(function () {

			time += 10;

			isValid = events.dispatch('validate');

			if (isValid.done || time > 1000) {
				validate.stop();
				clearInterval(self.timer);
				changePath(isValid.route);
			}

		}, 10);
	}

	validate.run();

	check();

});
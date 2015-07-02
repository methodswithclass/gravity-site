var app = angular.module('nuplae', ['shared-module', 'accel-module', 'console-module', 'ngRoute']);

var mobiledebug = false;

app.config(function($routeProvider) {
    $routeProvider.
      //Display desktop version
      when('/invalid', {
        //Template for Desktop based browsers
        templateUrl: 'views/invalid.html'
      }).
      //Display mobile version
      when('/valid', {
        //Template for Mobile based browsers
        templateUrl: 'views/valid.html'
      }).otherwise("views/checking.html");
}).
run(function (validate, events, $location) {

	validate.run();

	var time = 0;

	var timer = setInterval(function () {

		time += 10;

		var hasValidated = events.dispatch('validate');

		if (time > 1000 || hasValidated.done) {
			clearInterval(timer);
			validate.stop();
			$location.path(hasValidated.route);
		}

	}, 10);

});
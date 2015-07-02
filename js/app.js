var app = angular.module("nuplae", ['ngRoute']);

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
      })
}).
run(function ($location, events, validate) {

	var production;

	var isValid = false;

	var time = 0;

	validate.run();

	var proceed = function () {

		if(isValid) {

			production = "/valid";
		}
		else {

			console.log("valid is " + isValid);

			if (mobiledebug) {
				production = "/valid";
			}
			else {
				production = "/invalid";
			}
		}

		$location.path(production);
	}

	var check = setInterval(function() {

		isValid = events.dispatch("validate");

		time += 10;

		if (isValid || time > 500) {
			clearInterval(check);
			proceed();
		}

	}, 10)

	

	
});
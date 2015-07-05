app.factory("routeService", ['$routeProvider', '$location', '$state', 'events', 'validate', function ($routeProvider, $locator, $state, events, validate) {


	var checking = "/checking";
	var invalid = "/invalid";
	var valid = "/valid";

	$routeProvider.
	      when(invalid, {
	  
	        templateUrl: 'features/nuplae/invalid.html'
	      }).
	      when(valid, {
	      
	        templateUrl: 'features/nuplae/valid.html',
	        controller:'nuplaeCtrl',
	        controllerAs:'main'
	      }).
	      when(checking, {

	      	templateUrl:'features/nuplae/checking.html',
	        controller:'consoleCtrl'
	      });

	var validate = function () {
		var isRegistered = false;

		var timer = setInterval(function () {

			isRegistered = events.dispatch("console");

			console.log(isRegistered);

			if (isRegistered) {

				clearInterval(timer);
				timer = null;
			}


		}, 10);

		if (isRegistered) {

			var desktopdebug = false;
			var checking = "/checking";
			var invalid = "/invalid";
			var valid = "/valid";

			var isValid;

			if (!desktopdebug) {
				console.log("validate");
				isValid = validate.run();
			}
			else {
				isValid = validate.invalidate();
				//$location.path(checking);
			}

			isValid.then( 
			function (path) { //valid
				console.log(path);
				$location.path(path);
				
				$state.transitionTo("Modal.valid");
			},
			function (path) { //invalid
				console.log(path);
				$location.path(path);
			});

		}

	}

	return {
		validate:validate
	}

}]);
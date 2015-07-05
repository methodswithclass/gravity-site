managerModule.factory("validate.wrapper", ['validate.service', '$location', '$state', 'events', function ($locator, $state, events, validate) {


	var run = function () {
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
		run:run
	}

}]);
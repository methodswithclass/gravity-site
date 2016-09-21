validateModule.factory("validate.wrapper", ['$q', 'validate.service', 'events', function ($q, validate, events) {


	var run = function () {

		return $q(function (resolve, reject) {

			var isValid;

			var desktopdebug = false;
			var isRegistered = false;
			var checking = "/checking";
			var invalid = "/invalid";
			var valid = "/valid";
			
			var proceed = function () {

				if (!desktopdebug) {
					isValid = validate.run();
				}
				else {
					isValid = validate.invalidate();
				}

				isValid.then( 
				function (path) { //valid
					resolve(path);
				},
				function (path) { //invalid
					reject(path);
				});

			}

			var timer = setInterval(function () {

				isRegistered = events.dispatch("console");

				if (isRegistered) {

					clearInterval(timer);
					timer = null;
					proceed();
				}


			}, 10);

		});

	}

	return {
		run:run
	}

}]);
validateModule.factory("validate.wrapper", ['$q', 'validate.service', 'events', function ($q, validate, events) {


	var run = function () {

		return $q(function (resolve, reject) {

			//console.log("run validate wrapper");

			var isValid;

			var desktopdebug = false;
			var isRegistered = false;
			var checking = "/checking";
			var invalid = "/invalid";
			var valid = "/valid";
			
			var proceed = function () {

				if (!desktopdebug) {
					//console.log("validate");
					isValid = validate.run();
				}
				else {
					isValid = validate.invalidate();
					//$location.path(checking);
				}

				isValid.then( 
				function (path) { //valid
					//console.log("is valid");
					resolve(path);
				},
				function (path) { //invalid
					//console.log("is invalid");
					reject(path);
				});

			}

			var timer = setInterval(function () {

				isRegistered = events.dispatch("console");

				//console.log(isRegistered);

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
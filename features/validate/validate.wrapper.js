validateModule.factory("validate.wrapper", ['$q', 'validate.service', 'events', 'utility', function ($q, validate, events, g) {


	var isRegistered = false;

	var checkRegistered = function (resolve, reject, complete) {

		var timer = setInterval(function () {

			isRegistered = events.dispatch("console");

			console.log("valid wrapper", "registered", isRegistered);

			if (isRegistered) {

				clearInterval(timer);
				timer = null;

				complete(resolve, reject);
			}

		}, 10);

	}

	var runValidation = function (resolve, reject) {

		console.log("valid wrapper", "run validation");

		validate.run().then( 
		function (path) { //valid
			resolve(path);
		},
		function (path) { //invalid
			reject(path);
		});
	}

	var forceValidation = function (resolve, reject) {

		console.log("valid wrapper", "force validation");

		if (g.isValid()) {

			validate.validate().then( 
			function (path) { //valid
				resolve(path);
			},
			function (path) { //invalid
				reject(path);
			});
		}
		else {
			validate.invalidate().then( 
			function (path) { //valid
				resolve(path);
			},
			function (path) { //invalid
				reject(path);
			});
		}
	}

	var run = function () {

		console.log("valid wrapper", "run");

		return $q(function (resolve, reject) {
		
			checkRegistered(resolve, reject, runValidation);

		});
	}

	var force = function () {

		console.log("valid wrapper", "force");

		return $q(function (resolve, reject) {
		
			checkRegistered(resolve, reject, forceValidation);

		});
	}

	return {
		run:run,
		force:force
	}

}]);
validateModule.factory("validate-wrapper.service", ['$q', 'validate.service', 'events', 'utility.service', function ($q, validate, events, g) {


	var isRegistered = false;

	var checkRegistered = function (resolve, reject, complete) {


		var i = 0;

		var timer = setInterval(function () {

			isRegistered = events.dispatch("console");

			console.log("valid wrapper", "console registered", isRegistered, i);

			if (isRegistered || i > 200) {

				clearInterval(timer);
				timer = null;

				complete(resolve, reject);
			}

			i++;

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

		//console.log("valid wrapper", "force validation");

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

			// runValidation(resolve, reject);
		});
	}

	var force = function () {

		console.log("valid wrapper", "force validation");

		return $q(function (resolve, reject) {
		
			checkRegistered(resolve, reject, forceValidation);

			// forceValidation(resolve, reject);

		});
	}

	return {
		run:run,
		force:force
	}

}]);
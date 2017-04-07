validateModule.factory("validate.service", ['$q', 'utility', function ($q, g) {

	var self = this;

	var check = 0;
	var minCheck = 10;
	this.motion = false;
	this.checkMotion = true;

	var setMotion = function (motion) {

		console.log("validation " + motion);;

		self.motion = motion;
	}

	var isMotion = function () {

		return self.motion;
	}

	var checkSupported = function (resolve, reject) {

		self.checkMotion = false;

		if(isMotion()) {
			resolve(g.c.valid);
		}
		else {
			reject(g.c.invalid);
		}
		
	}

	var invalidate = function () {

		console.log("valid service", "invalidate");

		return $q(function (resolve, reject) {
			reject(g.c.invalid);
		});
	}

	var validate = function () {

		console.log("valid service", "validate");

		return $q(function (resolve, reject) {
			resolve(g.c.valid);
		});

	}

	var run = function() {

		check = 0;
		self.checkMotion = true;

		console.log("run validate service");

		return $q(function (resolve, reject) {

			window.addEventListener("devicemotion", function (e) {

				if (self.checkMotion) {
					
					if (e.accelerationIncludingGravity.x || e.acceleration.x) {
						setMotion(true);
						check++;
						if (check > minCheck) {
							checkSupported(resolve, reject);
						}
					}
					else {
						setMotion(false);

						checkSupported(resolve, reject);
					}

				}
			
			});

		});

	}

	
	return {

		run:run,
		validate:validate,
		invalidate:invalidate
	}


}]);
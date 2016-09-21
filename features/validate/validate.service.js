validateModule.factory("validate.service", function ($q) {

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
			resolve("valid");
		}
		else {
			reject("invalid");
		}
		
	}

	var invalidate = function () {

		return $q(function (resolve, reject) {
			reject(invalid);
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
						setMotion(true);

						checkSupported(resolve, reject);
					}

				}
			
			});

		});

	}

	
	return {

		run:run,
		invalidate:invalidate
	}


});
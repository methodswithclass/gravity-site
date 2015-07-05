accelModule.factory("validate.service", function ($q) {

	var self = this;

	var valid = "/valid";
	var invalid = "/invalid";

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

		console.log("finished validating");


		if(isMotion()) {

			resolve(valid);
		}
		else {
			reject(invalid);
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

			if (window.DeviceMotionEvent) {

				window.addEventListener("devicemotion", function (e) {

					if (self.checkMotion) {

						if (e.accelerationIncludingGavity || e.acceleration) {
							console.log("DeviceMotion is supported: " + e.accelerationIncludingGravity.x);
							setMotion(true);
							check++;

							if (check > minCheck) {
								checkSupported(resolve, reject);
							}
						}
						else {
							console.log("DeviceMotion is not supported");
							setMotion(false);
							check++;

							if (check > minCheck) {
								checkSupported(resolve, reject);
							}
						}

					}
				});

			}
			else {

				setMotion(false);

				var wait = setTimeout(function() {

					checkSupported(resolve, reject);

				}, minCheck*2);
				

			}

		});

	}

	
	return {

		run:run,
		invalidate:invalidate
	}


});
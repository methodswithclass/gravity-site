accelModule.factory("validate", function ($q) {

	var self = this;

	var valid = "/valid";
	var invalid = "/invalid";

	var check = 0;
	this.motion = false;
	this.checkMotion = true;

	var setMotion = function (motion) {

		self.motion = motion;
	}

	var isMotion = function () {

		return self.motion;
	}

	var checkSupported = function (resolve, reject) {

		self.checkMotion = false;


		if(isMotion()) {

			resolve(valid);
		}
		else {

			if (mobiledebug) {
				resolve(valid);
			}
			else {
				reject(invalid);
			}
		}
		
	}

	var run = function() {

		check = 0;
		self.checkMotion = true;

		return $q(function (resolve, reject) {

			window.addEventListener("devicemotion", function (e) {

				if (self.checkMotion) {

					if (e.accelerationIncludingGravity.x || e.acceleration.x) {
						console.log("DeviceMotion is supported: " + e.accelerationIncludingGravity.x);
						setMotion(true);
						check++;

						if (check > 20) {

							checkSupported(resolve, reject);
						}
					}
					else {
						console.log("DeviceMotion is not supported");
						setMotion(false);
						check++;

						if (check > 10) {
							checkSupported(resolve, reject);
						}
					}

				}

			});

		});

	}

	
	return {

		run:run
	}


});
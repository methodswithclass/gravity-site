accelModule.factory("validate", function ($q) {

	var self = this;

	var valid = "/valid";
	var invalid = "/invalid";

	var check = 0;
	this.motion = false;

	var setMotion = function (motion) {

		self.motion = motion;
	}

	var isMotion = function () {

		return self.motion;
	}

	var checkSupported = function (resolve, reject) {

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

	var run = $q(function (resolve, reject) {

		window.addEventListener("devicemotion", function (e) {

			//console.log(e.accelerationIncludingGravity.x);
			if (check < 5) {
				if (e.accelerationIncludingGravity.x || e.acceleration.x) {
					console.log("DeviceMotion is supported: " + e.accelerationIncludingGravity.x);
					setMotion(true);
				}
				else {
					console.log("DeviceMotion is not supported");
					setMotion(false);
				}
				check++;
			}
			else if (check == 5) {

				checkSupported(resolve, reject);

				check++;
				
			}

		});

	});

	
	return {

		run:run
	}


});
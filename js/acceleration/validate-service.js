accelModule.factory("validate", function (events) {

	var self = this;

	var valid = "/valid";
	var invalid = "/invalid";

	this.production = invalid;
	this.finished = false;

	var check = 0;
	var isSupported = false;

	events.on('validate', function () {

		//console.log("route is " + self.production);

		return {done:self.finished, route:self.production};

	});

	this.checkmotion = function (e) {

		//console.log(e.accelerationIncludingGravity.x);
		if (check < 5) {
			if (e.accelerationIncludingGravity.x || e.acceleration.x) {
				console.log("DeviceMotion is supported: " + e.accelerationIncludingGravity.x);
				isSupported = true;
			}
			else {
				console.log("DeviceMotion is not supported");
				isSupported = false;
			}
			check++;

			self.finished = false;
		}
		else {

			if(isSupported) {

				self.production = valid;
			}
			else {

				//console.log("valid is " + isSupported);

				if (mobiledebug) {
					self.production = valid;
				}
				else {
					self.production = invalid;
				}
			}

			self.finished = true;

			check++;
			
		}

	}

	var stop = function () {

		window.removeEventListener("devicemotion", self.checkmotion);
	}

	var run = function () {

		window.addEventListener("devicemotion", self.checkmotion);

	}

	
	return {

		run:run,
		stop:stop
	}


});
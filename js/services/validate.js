app.factory("validate", ['events', function (events) {

	var self = this;

	this.finished = false;

	var isSupported = false;

	events.on('validate', function () {

		if (self.finished) return isSupported;

	});


	var run = function () {

		var check = 0;

		window.addEventListener("devicemotion", function (e) {

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
			}
			else {

				self.finished = true;
			}
			
		});

	
		return {

			run:run
		}


}]);
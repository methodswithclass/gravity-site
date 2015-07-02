app.factory("validate", function ($location, events) {

	var self = this;

	this.finished = false;

	var isSupported = false;

	var production;

	events.on('validate', function () {

		$location.path(production);

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

				if(isSupported) {

					production = "/valid";
				}
				else {

					console.log("valid is " + isValid);

					if (mobiledebug) {
						production = "/valid";
					}
					else {
						production = "/invalid";
					}
				}

				events.dispatch("validate");
				
			}


			
		});

	}

	
	return {

		run:run
	}


});
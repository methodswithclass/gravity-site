app.factory("validate", function ($location, events) {


	events.on('validate', function () {

	 	$location.path() == production;

	});

	var run = function () {

		var check = 0;

		var production;

		var isSupported = false;

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
			else if (check == 5) {

				if(isSupported) {

					production = "/valid";
				}
				else {

					console.log("valid is " + isSupported);

					if (mobiledebug) {
						production = "/valid";
					}
					else {
						production = "/invalid";
					}
				}

				console.log(production);

				events.dispatch("validate");

				check++;
				
			}

	}

	
	return {

		run:run
	}


});
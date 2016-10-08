calibrateModule.directive("calibrate", ["calibrate.service", "events", "$state", function (calibrate, events, $state) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/calibration/calibrate.html",
		link:function ($scope, element, attr) {

			if ($scope.info.id == "calibrate") {


				var message, $message;
				var progress, $progress;
				var timer;

				events.on("startCalibrate", function () {

					message = document.getElementById("message");
					progress = document.getElementById("progress");

					$message = $("#message");
					$progress = $("#progress");

					timer = setInterval(function() {
					
						//console.log("update message elements", message, progress);
						//console.log("update message content", calibrate.getMessage(), calibrate.getProgress());
						
						// $message.html("message is: " + calibrate.getMessage());
						// $progress.css({width:calibrate.getProgress() + "%"});

						message.innerHTML = "message is: " + calibrate.getMessage();
						progress.style.width = calibrate.getProgress() + "%";

						$scope.$apply();

					}, 10);

				});

				events.on("leaveCalibrate", function () {

					clearInterval(timer);
					timer = {};
					timer = null;

				})

			}


		}
	}

}]);
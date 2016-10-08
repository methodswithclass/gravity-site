calibrateModule.directive("calibrate", ["calibrate.service", "events", "$state", function (calibrate, events, $state) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/calibration/calibrate.html",
		link:function ($scope, element, attr) {

			if ($scope.info.id == "calibrate") {

				var $message;
				var $progress;
				var timer;

				events.on("startCalibrate", function () {

					$message = $("#message");
					$progress = $("#progress");

					timer = setInterval(function() {
					
						console.log("update message elements", $message[0], $progress[0]);
						console.log("update message content", calibrate.getMessage(), calibrate.getProgress());
						
						$message.html("message is:" + calibrate.getMessage());
						$progress.css({width:calibrate.getProgress() + "%"});

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
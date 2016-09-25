calibrateModule.directive("calibrate", ["calibrate.service", "events", "$state", function (calibrate, events, $state) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/calibration/calibrate.html",
		link:function ($scope, element, attr) {

			if ($scope.info.id == "calibrate") {

				var timer = setInterval(function() {

					
					var $message = $("#message");
					var $progress = $("#progress");

					//console.log("update message", $message[0], $progress[0]);

					$message.html("message is:" + calibrate.message());

					//$("#progress").css({width:calibrate.getProgress() + "%"});
					$progress.css({width:50 + "%"});

					$scope.$apply();

				}, 10);
			}


		}
	}

}]);
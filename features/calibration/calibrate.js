calibrateModule.directive("calibrate", ["calibrate.service", "events", "$state", 'utility', function (calibrate, events, $state, util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/calibration/calibrate.html",
		link:function ($scope, element, attr) {

			if ($scope.info.id == 'calibrate') {

				var timer;

				var phases = {
					over:{
						src:"img/tilt-arrow-over.png",
						instructions:"tilt down, away from you",
						pos:{
							image:{
								top:"top0",
								left:"right0"
							},
							continue:{
								top:"bottom0",
								left:"left0"
							}
						}
					},
					under:{
						src:"img/tilt-arrow-under.png",
						instructions:"tilt up, toward you",
						pos:{
							image:{
								top:"bottom0",
								left:"right0"
							},
							continue:{
								top:"top0",
								left:"left0"
							}
						}
					},
					right:{
						src:"img/tilt-arrow-right.png",
						instructions:"hold flat, tilt to the right",
						pos:{
							image:{
								top:"top0",
								left:"right0"
							},
							continue:{
								top:"bottom0",
								left:"right0"
							}
						}
					},
					left:{
						src:"img/tilt-arrow-left.png",
						instructions:"hold flat, tilt to the left",
						pos:{
							image:{
								top:"top0",
								left:"left0"
							},
							continue:{
								top:"bottom0",
								left:"right0"
							}
						}
					}

				}

				$scope.progress = "0%";
				$scope.message = "";
				$scope.hidecontinue = true;
				$scope.accel = 0;

				$scope.continue = function () {

					$scope.hidecontinue = true;
					events.dispatch("cal-service-accel");

				}

				events.on("calibrate-pause", function () {

					console.log("progress stopped, allow continue");

					events.dispatch("progress-stop");
					events.dispatch("calibrate-stop");

					$scope.hidecontinue = false;

					$scope.$apply();
				})

				events.on("calibrate-start", function () {

					clearInterval(timer);
					timer = setInterval(function() {

						$scope.message = calibrate.getMessage();
						$scope.progress = calibrate.getProgress()*100 + "%";
						$scope.accel = util.truncate(calibrate.getAccel(), 4);

						console.log("message", $scope.message, "progress", $scope.progress);

						$scope.$apply();

					}, 10);

				});

				events.on("calibrate-stop", function () {

					clearInterval(timer);
					timer = {};
					timer = null;

				});

				events.on("tiltover", function () {

					$scope.phase = phases.over;
					//$scope.$apply();
				});

				events.on("tiltunder", function () {

					$scope.phase = phases.under;
					//$scope.$apply();
				});

				events.on("tiltright", function () {

					$scope.phase = phases.right;
					//$scope.$apply();
				});

				events.on("tiltleft", function () {

					$scope.phase = phases.left;
					//$scope.$apply();
				});

			}

		}
	}

}]);
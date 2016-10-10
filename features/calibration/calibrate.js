calibrateModule.directive("calibrate", ["calibrate.service", "events", "$state", 'utility', function (calibrate, events, $state, util) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/calibration/calibrate.html",
		link:function ($scope, $element, attr) {

			var id = $scope.info.id;

			if (id == 'calibrate') {

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
								left:"left0"
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
					},
					none:{
						src:"",
						instructions:"continue",
						pos:{
							image:{
								top:"top200",
								left:"left0"
							},
							continue:{
								top:"top0",
								left:"right0"
							}
						}
					}
				}

				$scope.progress = "0%";
				$scope.message = "";
				$scope.accel;

				var $btn;
				var showing = true;

				var toggleBtn = function () {

					if (showing) {
						showing = false;
						$btn.hide();
						$btn.addClass("hidden");
					}
					else {
						showing = true;
						$btn.show();
						$btn.removeClass("hidden");
					}

				}

				setTimeout(function () {

					$btn = $("#btn" + id);
					toggleBtn();

				}, 500);

				$scope.continue = function () {

					calibrate.toggleRunning();
					toggleBtn();
				}

				events.on("calibrate-toggle", function () {

					toggleBtn();
				})

				events.on("calibrate-start", function () {

					clearInterval(timer);
					timer = setInterval(function() {

						$scope.message = calibrate.getMessage();
						$scope.progress = calibrate.getProgress()*100 + "%";
						// $scope.accel = " :  accel: " + util.truncate(calibrate.getAccel().curr, 4) 
						// 				+ ": factor: " +  util.truncate(calibrate.getAccel().factor, 4);

						//console.log("message", $scope.message, "progress", $scope.progress, "accel", $scope.accel);

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
				});

				events.on("tiltunder", function () {

					$scope.phase = phases.under;
				});

				events.on("tiltright", function () {

					$scope.phase = phases.right;
				});

				events.on("tiltleft", function () {

					$scope.phase = phases.left;
				});

				events.on("tiltnone", function () {

					$scope.phase = phases.none;
				})

			}

		}
	}

}]);
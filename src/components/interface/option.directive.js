interfaceModule.directive("option", ['state.service', 'calibrate.service', "utility.service", function (states, calibrate, utility) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"assets/views/option.view.html",
		link:function ($scope, element, attr) {

			var self = this;

			$scope.onPressup = function () {

				if ($scope.page.id == "calibrate") {
					utility.calibrate.reset();
					calibrate.clearCalibration();
				}

				states.go("page." + $scope.page.id);
			}

		}
	}

}]);
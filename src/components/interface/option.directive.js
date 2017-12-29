interfaceModule.directive("option", ['state.service', 'calibrate.service', function (states, calibrate) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"assets/views/option.view.html",
		link:function ($scope, element, attr) {

			var self = this;

			$scope.onPressup = function () {

				if ($scope.page.id == "calibrate") {
					calibrate.clearCalibration();
				}

				states.go("page." + $scope.page.id);
			}

		}
	}

}]);
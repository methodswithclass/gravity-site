managerModule.directive("toggle", ["manager.service", function (manager) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/acceleration/toggle.html",
		link:function ($scope, element, attr) {

			var running = false;

			var toggle = function () {

				if (running) {
					manager.stop();
				}
				else {
					manager.start();
				}

			}

		}
	}

}]);
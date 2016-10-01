uiModule.directive("back", ['states', 'send', 'manager', 'settings.service', function (states, send, manager, settings) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"views/back.html",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			$scope.onPressup = function () {

				console.log("return home");

				if (info.id == "settings") {
					settings.save();
				}

				states.go("page.home");
			}
			
		}
	}

}]);
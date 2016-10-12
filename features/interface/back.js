uiModule.directive("back", ['states', 'send', 'manager', function (states, send, manager) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"views/back.html",
		link:function ($scope, element, attr) {

			var info = $scope.info;

			$scope.onPressup = function () {

				console.log("return home");

				states.go("page.home");
			}
			
		}
	}

}]);
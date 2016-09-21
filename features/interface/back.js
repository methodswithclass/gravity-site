uiModule.directive("back", ['states', 'send', 'manager', function (states, send, manager) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/views/back.html",
		link:function ($scope, element, attr) {

			$scope.onPressup = function () {

				console.log("return home");

				states.go("page.home");
				
			}
			
		}
	}

}]);
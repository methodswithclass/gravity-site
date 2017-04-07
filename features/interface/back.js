uiModule.directive("back", ['states', 'send', 'events', 'manager', function (states, send, events, manager) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"views/sub-page/back.html",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			$scope.onPressup = function () {

				console.log("return home");

				events.dispatch("gohome");
			}
			
		}
	}

}]);
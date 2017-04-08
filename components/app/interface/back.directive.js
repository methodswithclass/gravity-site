interfaceModule.directive("back", ['state.service', 'send.service', 'events.service', 'manager.service', function (states, send, events, manager) {

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
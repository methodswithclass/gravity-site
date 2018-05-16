interfaceModule.directive("back", ['state.service', 'send', 'events', 'manager.service', function (states, send, events, manager) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"/assets/views/back.view.html",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			$scope.onPressup = function () {

				console.log("return home");

				events.dispatch("gohome");
			}
			
		}
	}

}]);
interfaceModule.directive("option", ['state.service', function (states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"./option.view.html",
		link:function ($scope, element, attr) {

			var self = this;

			$scope.onPressup = function () {

				states.go("page." + $scope.page.id);
			}

		}
	}

}]);
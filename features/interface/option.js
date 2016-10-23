uiModule.directive("option", ['states', function (states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"views/sub-page/option.html",
		link:function ($scope, element, attr) {

			var self = this;

			$scope.onPressup = function () {

				states.go("page." + $scope.page.id);
			}

		}
	}

}]);
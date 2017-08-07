settingsModule.directive("settingsBtn", ['state.service', function (states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"assets/views/settings/settings-btn.html",
		link:function ($scope, element, attr) {

			$scope.onPressup = function () {

				states.go("page.settings");
			}

		}
	}

}]);
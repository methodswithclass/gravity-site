settingsModule.directive("settingsBtn", ['states', 'send', function (states, send) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings-btn.html",
		link:function ($scope, element, attr) {

			$scope.onPressup = function () {

				states.go("page.settings");
			}

		}
	}

}]);
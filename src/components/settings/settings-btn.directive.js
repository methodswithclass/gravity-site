settingsModule.directive("settingsBtn", ['state.service', 'settings.service', function (states, settings) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"assets/views/settings/settings-btn.html",
		link:function ($scope, element, attr) {

			$scope.onPressup = function () {

				settings.settings.init.init();

				states.go("page.settings");
			}

		}
	}

}]);
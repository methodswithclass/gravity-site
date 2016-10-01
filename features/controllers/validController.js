controllerModule.controller("ValidController", ['$scope', 'global', 'states', 'data.service', function ($scope, g, states, data) {


	setTimeout(function () {

		states.go("page.settings");
	}, 2000);

}])
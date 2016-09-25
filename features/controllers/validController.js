controllerModule.controller("ValidController", ['$scope', 'global', 'states', 'data.service', function ($scope, g, states, data) {


	setTimeout(function () {

		states.go("page.calibrate");
	}, 2000);

}])
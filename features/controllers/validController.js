controllerModule.controller("ValidController", ['$scope', 'global', 'states', 'data.service', function ($scope, g, states, data) {

	console.log("valid controller");
	console.log(" ");
	console.log(" ");

	setTimeout(function () {

		states.go("page.calibrate");
	}, 2000);

}])
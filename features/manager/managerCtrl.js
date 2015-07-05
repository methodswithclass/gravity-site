managerModule.controller("mangerCtrl", ['routeService', 'stateService', '$location', function (routeService, stateService, $location) {

	events.on("console", function () {

		return con.isRegistered();
	})

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

	stateService.setup();

	routeService.validate();

}]);
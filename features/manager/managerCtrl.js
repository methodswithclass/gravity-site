managerModule.controller("managerCtrl", ['routeService', 'stateService', function (routeService, stateService) {

	events.on("console", function () {

		return con.isRegistered();
	})

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

	stateService.setup();

	routeService.validate();

}]);
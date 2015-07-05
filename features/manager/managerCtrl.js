managerModule.controller("managerCtrl", ['$document', 'routeService', 'stateService', 'events', 'con', function ($document, routeService, stateService, events, con) {

	events.on("console", function () {

		return con.isRegistered();
	})

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

	stateService.setup();

	routeService.validate();

}]);
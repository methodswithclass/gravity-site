managerModule.controller("managerCtrl", ['$document', 'validate.wrapper', 'states', 'events', 'con', function ($document, checkDevice, states, events, con) {

	events.on("console", function () {

		return con.isRegistered();
	});

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

	states.define();

	checkDevice.run();

}]);
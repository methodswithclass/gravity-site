managerModule.controller("managerCtrl", ['$document', 'validate', 'states', 'events', 'con', function ($document, validate, states, events, con) {

	events.on("console", function () {

		return con.isRegistered();
	});

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

	states.define();

	validate.run();

}]);
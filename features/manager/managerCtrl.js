managerModule.controller("managerCtrl", ['$document', 'validate.wrapper', 'states', 'events', 'con', function ($document, checkDevice, states, events, con) {

	console.log("open manager controller");

	events.on("console", function () {

		console.log("console event dispatch");

		return con.isRegistered();
	});

	angular.element($document).ready(function () {

		console.log("document ready");

		con.register($("#consoleContainer"));
	
	});

	states.define();

	checkDevice.run();

}]);
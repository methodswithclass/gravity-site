consoleModule.controller("consoleCtrl", ['$document', 'events', 'con', function ($document, events, con) {

	events.on("console", function () {

		return con.isRegistered();
	})

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));
	
	});

}]);
managerModule.controller("managerCtrl", ['$document', 'validate.wrapper', '$location', 'states', 'events', 'con', function ($document, checkDevice, $location, states, events, con) {

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

	checkDevice.then( 
	function (path) { //valid
		console.log("change location to " + path);
		$location.path(path);
		
		states.showModal("valid");
	},
	function (path) { //invalid
		console.log("change location to " + path);
		$location.path(path);
	});

}]);
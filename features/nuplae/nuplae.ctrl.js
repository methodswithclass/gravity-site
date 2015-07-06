
nuplaeModule.controller('nuplaeCtrl', ['$document', 'params', 'validate.wrapper', 'nuplaeService', 'states', 'events', 'con', '$location', function ($document, params, checkDevice, nuplaeService, states, events, con,  $location) {

	var self = this;

	self.pages = params.pages;


	console.log("open nuplae controller");

	events.on("console", function () {

		console.log("console event dispatch");

		return con.isRegistered();
	});



	angular.element($document).ready(function () {

		console.log("document ready");

		con.register($("#consoleContainer"));
	
	});

	events.on("loaded", function () {

		console.log("loaded event dispatch");

		var result = nuplaeService.parseInput(0);

		result.then(
		function (output) {
			console.log("go to home");
			states.gotoPage(output.index);
		},
		function (message) {
			console.log(message);
		});
	})

	states.define();

	var result = checkDevice.run();

	result.then( 
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
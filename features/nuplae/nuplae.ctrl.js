
nuplaeModule.controller('nuplaeCtrl', ['$document', 'params', 'validate.wrapper', 'buttonService', 'states', 'events', 'con', '$location', function ($document, params, checkDevice, buttons, states, events, con,  $location) {

	console.log("open nuplae controller");

	var self = this;



	// ===================== DATA ======================

	self.pages = params.pages;



	// ===================== SETUP ======================

	states.define();

	buttons.setupReceivers();



	// ===================== EVENTS ======================

	events.on("loaded", function () {

		console.log("loaded event dispatch");

		buttons.setupCheckScroll();

		states.openHome();

	});

	events.on("console", function () {

		//console.log("console event dispatch");

		return con.isRegistered();
	});



	// ===================== VALIDATE ======================

	var result = checkDevice.run();

	result.then( 
	function (path) { //valid
		//console.log("change location to " + path);
		$location.path(path);
	},
	function (path) { //invalid
		//console.log("change location to " + path);
		$location.path(path);
		states.showModal({modal:"invalid", time:1500});
	});



	// ===================== ON READY ======================

	angular.element($document).ready(function () {

		//console.log("document ready");

		con.register($("#consoleContainer"));

		con.attach();
	
	});

	

	

	

	

}]);

uiModule.controller('nuplaeCtrl', ['$scope', '$document', 'data.service', 'validate.wrapper', 'button.service', 'states', 'events', 'con', '$location', 'utility', 'manager', function ($scope, $document, data, checkDevice, buttons, states, events, con,  $location, g, manager) {

	console.log("open nuplae controller");

	var self = this;

	// ===================== DATA ======================

	self.pages = data.pages;

	// ===================== SETUP ======================

	states.define();
	manager.setupReceivers();



	// ===================== EVENTS ======================

	events.on("loaded", function () {

		console.log("loaded event dispatch");

		//buttons.setupCheckScroll();

		//states.go("page.home");

	});

	events.on("console", function () {

		//console.log("console event dispatch");

		return con.isRegistered();
	});

	// ===================== ON READY ======================

	angular.element($document).ready(function () {

		//console.log("document ready");

		con.register($("#consoleContainer"));

		con.attach();
	
	});

	
	$scope.getContentUrl = function() {
        
        console.log("get valid html");    

        var view = "valid.html";

        return 'features/views/' + view;
    }
	

	

	

}]);
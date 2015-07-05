consoleModule.controller("consoleCtrl", ['$document', '$location', 'validate', 'events', 'con', '$state', function ($document, $location, validate, events, con, $state) {


	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

		events.dispatch("valid");
		
	});

}]);
consoleModule.controller("consoleCtrl", ['$document', '$location', 'validate', 'events', 'con', '$state', function ($document, $location, validate, events, con, $state) {

	events.on("valid", function () {

		$state.go("Modal.valid");
		
	});


	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));


		var desktopdebug = false;
	    var checking = "/checking";
	    var invalid = "/invalid";
	    var valid = "/valid";

	    var isValid;

	    if (!desktopdebug) {
			console.log("validate");
			isValid = validate.run();
	    }
	    else {
			isValid = validate.invalidate();
			//$location.path(checking);
	    }

	    isValid.then( 
	    function (path) { //valid
			console.log(path);
			$location.path(path);
			events.dispatch("valid");
	    },
	    function (path) { //invalid
			console.log(path);
			$location.path(path);
	    });

	});

}]);
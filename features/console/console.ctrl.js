consoleModule.controller("consoleCtrl", ['$document', '$location', 'validate', 'events', 'con', function ($document, $location, validate, events, con) {

	events.on("validate", function () {

		
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
	    },
	    function (path) { //invalid
			console.log(path);
			$location.path(path);
	    });

	});

}]);
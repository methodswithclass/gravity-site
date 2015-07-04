consoleModule.controller("consoleCtrl", ['$document', '$location', 'validate', 'con', function ($document, $location, validate, con) {




	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));


		var desktopdebug = false;
	    var checking = "/checking";
	    var invalid = "/invalid";
	    var valid = "/valid";

	    var isValid;
	    $location.path(checking);

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
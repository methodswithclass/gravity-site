
nuplaeModule.controller('nuplaeCtrl', ['$location', 'validate', '$document', 'params', 'events', 'navigation', function ($location, validate, $document, params, events, nav) {

	var self = this;

	self.pages = params.pages;

	var init = function () {

		var name = params.pages[0].name;

		//console.log(name);

		var elem;

		var complete = function (elem) {

			console.log("loaded");

			nav.open(0, 10);
		}

		var timer = setInterval(function () {

			elem = $("#page" + name);

			//console.log(elem[0]);

			if (elem[0]) {
				clearInterval(timer);
				complete(elem);
			}

		}, 10);

	}

	init();

	events.on("valid", function () {

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
			
			$state.transitionTo("Modal.valid");


	    },
	    function (path) { //invalid
			console.log(path);
			$location.path(path);
	    });

	    return true;
		
		
	});

	

}]);
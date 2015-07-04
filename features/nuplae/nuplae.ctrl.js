nuplaeModule.controller('nuplaeCtrl', ['$location', 'validate', '$document', 'con', 'params', 'navigation', function ($location, validate, $document, con, params, nav) {

	var self = this;

	var desktopdebug = false;

	var checking = "/checking";
	var invalid = "/invalid";
	var valid = "/valid";

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

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

		if (!desktopdebug) {

	      $location.path(checking);

	    	var isValid = validate.run();

	    	isValid.then(	
	    	function (path) {
	    		$location.path(path);
	    	},
	    	function (path) {
	    		$location.path(path);
	    	});
	  }
	  else {
	      $location.path(invalid);
	      //$location.path(checking);
	  }

	});

}]);
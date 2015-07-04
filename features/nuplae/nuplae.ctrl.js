nuplaeModule.controller('nuplaeCtrl', ['$location', 'validate', '$document', 'con', 'params', 'navigation', function ($location, validate, $document, con, params, nav) {

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

	var desktopdebug = false;


	var checking = "/checking";
	var invalid = "/invalid";
	var valid = "/valid";

	this.isValid;

	this.isValid.then(	
	function (path) { //valid
		$location.path(path);
		init();
	},
	function (path) { //invalid
		$location.path(path);
	});

	angular.element($document).ready(function () {

		$location.path(checking);

		con.register($("#consoleContainer"));

		if (!desktopdebug) {

			self.isValid = validate.run();
		}
		else {
			self.isValid = validate.invalidate();
			//$location.path(checking);
		}

	});

}]);
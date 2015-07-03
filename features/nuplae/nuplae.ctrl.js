nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	self.parsePages = function (page) {

		var name = page.name;

		var view = "home.html";

		var test = name == "Home" ? true : false;

		if (test) {

			view = "home.html";

			console.log(view);

			return view;
		}
		else {
			return name == "Calibrate" ? true : false;
		}

		if (test) {

			view = "calibrate.html";

			console.log(view);

			return view
		}
		else {

			var view = name == "Gravity" || name == "Float" ? "setup.html" : "game.html";

			console.log(view);

			return view;
		}

		console.log("no return " + view);

		return view;
	}

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
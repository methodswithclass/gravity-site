nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	self.parsePages = function (page) {

		var name = page.name;

		var test = name == "Home" ? true : false;

		if (test) {
			return "home.html";
		else {
			return name == "Calibrate" ? true : false;
		}

		if (test) {
			return "calibrate.html";
		else {
			return name == "Gravity" || name == "Float" ? "setup.html" : "game.html";
		}

		return "home.html";
	}

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
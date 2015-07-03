nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params;

	self.parsePages = function (index) {

		return index == 0 ? 'home.html' : index == 1 || index == 2 ? "setup.html" : "game.html";
	}

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
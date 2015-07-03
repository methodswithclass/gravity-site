nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	console.log(self.pages[0].name);

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

	$("#finished" + self.pages[0].name).bind("load", function () {

		var home = $("#pageHome");

		var body = $("#body");

		console.log(home[0]);

		console.log(body[0]);

		body.scrollTo(home,10);

	});

}]);
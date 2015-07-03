nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

		var home = $("#pageHome");

		var body = $("#body");

		body.scrollTo(home,10);

	});

}]);
nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', 'navigation', function ($document, con, params, nav) {

	var self = this;

	self.pages = params.pages;
	

    nav.open(0, 10);

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
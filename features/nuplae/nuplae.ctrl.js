nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.pages = params.pages;

	console.log(self.pages[0].name);


	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
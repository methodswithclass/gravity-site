nuplaeModule.controller('nuplae-ctrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.data = {};

	self.data.home = params.home;

	self.data.pages = params.pages;

	console.log(self.data.pages.length);

	for (i in self.data.pages) {

		console.log(self.data.pages[i].name);
	}

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
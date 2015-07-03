nuplaeModule.controller('nuplae-ctrl', ['$document', 'con', 'params', function ($document, con, pages) {

	var self = this;

	this.data = pages;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
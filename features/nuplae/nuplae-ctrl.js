nuplaeModule.controller('nuplae-ctrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	this.params = params;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
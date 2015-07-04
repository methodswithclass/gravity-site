nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', 'nuplaeService', function ($document, con, params, nuServ) {

	var self = this;

	self.pages = params.pages;

	nuServ.init();    

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
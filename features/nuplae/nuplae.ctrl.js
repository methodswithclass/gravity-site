nuplaeModule.controller('nuplaeCtrl', ['$document', 'con', 'params', function ($document, con, params) {

	var self = this;

	self.home = params.home;

	self.games = params.games;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
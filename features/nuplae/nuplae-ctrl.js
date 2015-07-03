nuplaeModule.controller('nuplae-ctrl', ['$scope', '$document', 'con', 'params', function ($scope, $document, con, params) {

	var self = this;

	self.home = params.home;

	self.games = params.games;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
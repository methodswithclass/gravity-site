nuplaeModule.controller('nuplae-ctrl', ['$scope', '$document', 'con', 'params', function ($scope, $document, con, params) {

	var data = {};

	data.home = params.home;

	data.games = params.games;

	$scope.data = data;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
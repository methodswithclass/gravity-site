nuplaeModule.controller('nuplae-ctrl', ['$document', 'con', 'params', function ($document, con, params) {

	var data = {};

	data.home = params.home;

	data.pages = params.pages;

	$scope.data = data;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	});

}]);
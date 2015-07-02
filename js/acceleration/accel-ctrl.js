accelModule.controller('MainController', ['$document', 'con', function ($document, con) {

	var self = this;

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	})

}]);
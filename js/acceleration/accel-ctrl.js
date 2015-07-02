accelModule.controller('accel-ctrl', ['$scope', '$location', 'validate', 'events', '$document', 'con', function ($scope, $location, validate, events, $document, con) {

	var self = this;

	var valid = "/valid";
	var invalid = "/invalid";

	validate.run();

	$scope.production = events.dispatch('validate');

	$scope.$watch(function (scope) {

		return scope.production;
	}, function (newValue, oldValue) {

		$location.path(newValue);
	});

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	})

}]);
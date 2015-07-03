accelModule.controller('accel-ctrl', ['$scope', '$location', 'validate', 'events', '$document', 'con', function ($scope, $location, validate, events, $document, con) {

	var self = this;

	// var valid = "/valid";
	// var invalid = "/invalid";

	// var isValid = {};
	// var time = 0;
	// this.timer;

	// var check = function () {

	// 	self.timer = setInterval(function () {

	// 		time += 10;

	// 		isValid = events.dispatch('validate');

	// 		$scope.production = isValid.route;

	// 		if (isValid.done || time > 1000) {
	// 			validate.stop();
	// 			clearInterval(self.timer);
	// 		}

	// 	}, 10);
	// }

	// validate.run();

	// check();

	// $scope.$watch(function (scope) {

	// 	return scope.production;
	// }, function (newValue, oldValue) {

	// 	$location.path(newValue);
	// });

	angular.element($document).ready(function () {

		con.register($("#consoleContainer"));

	})

}]);
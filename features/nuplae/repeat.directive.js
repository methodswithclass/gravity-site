nuplaeModule.directive("repeat", ['events', function (events) {

	return function (scope, element, attr) {
		
		if(scope.$last) {

			events.dispatch("loaded");
		}
	}
}]);
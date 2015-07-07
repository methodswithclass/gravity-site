nuplaeModule.directive("repeat", ['events', function (events) {

	return function (scope, element, attr) {
		
		if(scope.$last) {

			//if ($("#page" params.pages[params.pages.length].name)[0]) {

				events.dispatch("loaded");

			//}
		}
	}
}]);
nuplaeModule.directive("repeat", ['events', 'params', function (events, params) {

	return function (scope, element, attr) {
		
		if(scope.$last) {

			//if ($("#page" params.pages[params.pages.length].name)[0]) {

				events.dispatch("loaded");

			//}
		}
	}
}]);
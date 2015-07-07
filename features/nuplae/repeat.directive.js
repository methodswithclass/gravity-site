nuplaeModule.directive("repeat", ['events', 'send', function (events, send) {

	return function (scope, element, attr) {

		send.accum({name:"load", id:attr.id, data:element})
		
		if(scope.$last) {

			//if ($("#page" params.pages[params.pages.length].name)[0]) {

				events.dispatch("loaded");

			//}
		}
	}
}]);
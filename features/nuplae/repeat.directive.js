nuplaeModule.directive("repeat", ['events', 'send', function (events, send) {

	return function (scope, element, attr) {

		console.log(attr.id);

		send.accum({name:"pages", id:attr.id, data:element[0]})
		
		if(scope.$last) {

			//if ($("#page" params.pages[params.pages.length].name)[0]) {

				events.dispatch("loaded");

			//}
		}
	}
}]);
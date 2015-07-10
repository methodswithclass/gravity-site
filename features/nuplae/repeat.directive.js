nuplaeModule.directive("repeat", ['events', 'send', function (events, send) {

	return function (scope, element, attr) {

		//console.log(attr.id);

		if(scope.$last && attr.dir == "pages") {

			send.accum({name:attr.dir, id:attr.id, data:element[0]});

			var wait = setTimeout(function () {

				events.dispatch("loaded");
			}, 300);
			
		}
	}
}]);
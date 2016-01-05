uiModule.directive("repeat", ['events', 'send', function (events, send) {

	return function (scope, element, attr) {

		//console.log(attr.id);

		send.retrieve.accum({name:attr.dir, id:attr.id, data:element[0]});
		
	}
}]);
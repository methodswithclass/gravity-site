uiModule.directive("repeat", ['send', function (send) {

	return function (scope, element, attr) {

		send.retrieve.accum({name:attr.dir, id:attr.id, data:element[0]});
		
	}
}]);
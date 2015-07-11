nuplaeModule.directive("home", ['nuplaeService', 'send', 'events', function (nuServ, send, events) {
	
	return function ($scope, element, attr) {

		send.accum({name:attr.dir, id:attr.id, data:element[0]});

	}



}]);
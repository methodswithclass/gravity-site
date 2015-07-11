nuplaeModule.directive("home", ['nuplaeService', 'send', function (nuServ, send) {
	

	return function ($scope, element, attr) {

		send.accum({name:attr.dir, id:attr.id, data:element[0]});

	}



}]);
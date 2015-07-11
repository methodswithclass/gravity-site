nuplaeModule.directive("home", ['nuplaeService', 'events', function (nuServ, events) {
	
	return function ($scope, element, attr) {

		events.on("home", function () {

			return element[0];
				
		});

		

	}



}]);
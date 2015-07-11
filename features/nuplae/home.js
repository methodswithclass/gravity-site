nuplaeModule.directive("home", ['events', function (events) {
	
	return function ($scope, element, attr) {

		events.on("home", function () {

			return element[0];
				
		});

		

	}



}]);
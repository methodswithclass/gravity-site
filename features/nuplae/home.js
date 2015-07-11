nuplaeModule.directive("home", ['nuplaeService', 'send', function (nuServ, send) {
	

	return function ($scope, element, attr) {

		send.accum({name:attr.dir, id:attr.id, data:element[0]});

		$scope.scrollTop = function () {

			return $(element).offset().top;
		}

		$scope.$watch($scope.scrollTop,
			function (newvalue, oldvalue) {

				console.log("newvalue " + newvalue + " oldvalue " + oldvalue);

				if (Math.abs(newvalue - oldvalue) > 10) {

					nuServ.returnAllButtons();
				}

			});

	}



}]);
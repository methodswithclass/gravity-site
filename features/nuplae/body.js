nuplaeModule.directive("body", ['send', function (send) {

	return {

		link:function ($scope, element, attr) {

			send.accum({name:"body", id:"body", data:element[0]});

		}
	}

}]);
interfaceModule.directive("body", ['send.service', function (send) {

	return function ($scope, element, attr) {

		console.log("send body");

		send.retrieve.accum({name:"body", id:"body", data:element[0]});
	}

}]);
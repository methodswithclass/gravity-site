nuplaeModule.directive("option", ['nuplaeService', 'states', 'send', 'events', 'global', function (nuServ, states, send, events, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/nuplae/views/option.html",
		link:function ($scope, element, attr) {

			var self = this;

			var info = $scope.game;

			send.accum({name:attr.dir, id:attr.id, data:element[0]});

			$scope.onPress = function () {

				sconsole.log("change");

				nuServ.callChange();
				
			}

			$scope.onPressup = function () {

				console.log("return");

				nuServ.callReturn();
			}

			

		}
	}

}]);
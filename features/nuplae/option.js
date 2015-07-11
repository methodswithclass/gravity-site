nuplaeModule.directive("option", ['buttonService', 'states', 'send', 'events', 'global', function (buttons, states, send, events, g) {

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

				buttons.callChange();
				
			}

			$scope.onPressup = function () {

				console.log("return");

				buttons.callReturn();
			}

		}
	}

}]);
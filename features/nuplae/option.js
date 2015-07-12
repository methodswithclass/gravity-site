nuplaeModule.directive("option", ['buttonService', 'send', function (buttons, send) {

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

				console.log("change " + attr.id);

				buttons.callChange(attr.id, true);
				
			}

			$scope.onPressup = function () {

				console.log("return");

				buttons.callReturn(attr.id, false);
			}

		}
	}

}]);
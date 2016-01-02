uiModule.directive("option", ['buttonService', 'send', function (buttons, send) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/views/option.html",
		link:function ($scope, element, attr) {

			var self = this;

			var info = $scope.game;

			send.accum({name:attr.dir, id:attr.id, data:element[0]});

			// $scope.onPress = function () {

			// 	console.log("change " + attr.id);

			// 	buttons.callChange({name:attr.id, others:true, idId:true});
				
				
			// }

			$scope.onPressup = function () {

				console.log("button action");

				//buttons.callReturn({name:attr.id, others:false, isId:true});

				buttons.buttonAction({name:attr.id});
			}

		}
	}

}]);
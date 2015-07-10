nuplaeModule.directive("option", ['nuplaeService', 'states', 'events', function (nuServ, states, events) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:"features/nuplae/views/option.html",
		link:function ($scope, element, attr) {


			var info = $scope.info;

			var obj = {
				type:"option",
				name:"option" + info.name,
				back_press:"orange-back",
				back_save:info.menu,
				add_class:"lowered",
				text_press:"white",
				text_save:"white",
				complete:function () {
					states.gotoPage(info.index);
				}
			}

			$scope.onPress = function () {

				console.log("change");

				nuServ.changeButton(element, obj);
			}

			$scope.onPressup = function () {

				console.log("return");

				nuServ.returnButton(element, obj);

				obj.complete();
			}

		}
	}

}]);
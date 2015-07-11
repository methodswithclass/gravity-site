nuplaeModule.directive("option", ['nuplaeService', 'states', 'send', 'events', function (nuServ, states, send, events) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/nuplae/views/option.html",
		link:function ($scope, element, attr) {

			var press = false;
			var start;

			var info = $scope.game;

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

			send.accum({name:attr.dir, id:attr.id, data:element[0]});
			send.accum({name:"optionObj", id:attr.id, data:obj});

			$scope.onPress = function () {

				console.log("change");

				press = true;

				start = element.scrollTop();

				nuServ.changeButton(element, obj);
				
			}

			$scope.onPressup = function () {

				console.log("return");

				press = false;

				nuServ.returnButton(element, obj);

				obj.complete();
			}

			element.on("scroll", function () {

				if (press) {

					if (element.scrollTop() - start > 10) {
						nuServ.returnButton(element, obj);
						press = false;
					}

				}


			});

		}
	}

}]);
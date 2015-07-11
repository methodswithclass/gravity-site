nuplaeModule.directive("option", ['nuplaeService', 'states', 'send', 'events', 'global', function (nuServ, states, send, events, g) {

	var home = {};

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/nuplae/views/option.html",
		link:function ($scope, element, attr) {

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

			send.receiver({name:g.c.home, receiver:home});
			send.accum({name:attr.dir, id:attr.id, data:element[0]});
			send.accum({name:"optionObj", id:attr.id, data:obj});

			var scrollFunc = function () {

				console.log("scroll");

				if (element.scrollTop() - start > 10) {

					console.log("return from scroll");

					nuServ.returnButton(element, obj);
					$(home["home"]).off("scroll", scrollFunc);
				}

			}

			$scope.onPress = function () {

				console.log("change");

				start = element.scrollTop();

				nuServ.changeButton(element, obj);

				$(home["home"]).on("scroll", scrollFunc);
				
			}

			$scope.onPressup = function () {

				console.log("return");

				nuServ.returnButton(element, obj);

				obj.complete();
			}

			

		}
	}

}]);
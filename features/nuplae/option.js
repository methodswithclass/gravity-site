nuplaeModule.directive("option", ['nuplaeService', 'states', 'send', 'events', 'global', function (nuServ, states, send, events, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/nuplae/views/option.html",
		link:function ($scope, element, attr) {

			var self = this;

			this.start = 0;
			this.scrollThreshold = 2;
			this.down = false;

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

			var scrollFunc = function () {

				console.log("scroll");

				if (self.down) {

					if (Math.abs(self.home.scrollTop() - self.start) > self.scrollThreshold) {

						nuServ.returnButton(element, obj);
						self.down = false;
					}
				}

			}

			this.home = events.dispatch("home");

			self.home.on("scroll", scrollFunc);

			$scope.onPress = function () {

				console.log("change");

				self.start = self.home.scrollTop();

				nuServ.changeButton(element, obj);

				self.down = true;
				
			}

			$scope.onPressup = function () {

				console.log("return");

				self.down = false;

				nuServ.returnButton(element, obj);

				obj.complete();
			}

			

		}
	}

}]);
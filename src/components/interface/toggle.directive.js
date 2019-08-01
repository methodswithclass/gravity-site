interfaceModule.directive("toggle", ["manager.service", 'send',function (manager, send) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"/assets/views/toggle.view.html",
		link:function ($scope, element, attr) {

			var page = $scope.page;

			var playing = false;

			setTimeout(function() {

				var play = $("#play" + page.id);
				var stop = $("#stop" + page.id);

				var toggle = {play:play, stop:stop};

				send.retrieve.accum({name:"toggle", id:page.id, data:toggle});

			}, 500);

			$scope.toggle = function () {

				if (playing) {

					playing = false;
					manager.stopInstance(page.id);
					manager.resetInstance(page.id);
				}
				else {

					playing = true;
					manager.startInstance(page.id);
				}

			}


			$scope.play = function () {

				playing = true;
				manager.startInstance(page.id);
			}

			$scope.stop = function () {

				playing = false;
				manager.stopInstance(page.id);
				manager.resetInstance(page.id);
			}

		}
	}

}]);
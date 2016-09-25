managerModule.directive("toggle", ["manager", 'send',function (manager, send) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/manager/toggle.html",
		link:function ($scope, element, attr) {

			var id = $scope.info.id;

			var playing = false;

			setTimeout(function() {

				var play = $("#play" + id);
				var stop = $("#stop" + id);

				var toggle = {play:play, stop:stop};

				send.retrieve.accum({name:"toggle", id:id, data:toggle});

			}, 500);

			$scope.toggle = function () {

				if (playing) {

					playing = false;
					manager.stopInstance(id, false);
				}
				else {

					playing = true;
					manager.startInstance(id);
				}

			}

		}
	}

}]);
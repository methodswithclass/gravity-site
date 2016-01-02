managerModule.directive("toggle", ["manager", 'send',function (manager, send) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/manager/toggle.html",
		link:function ($scope, element, attr) {

			var id = $scope.info.id;

			setTimeout(function() {

				var play = $("#play" + id);
				var stop = $("#stop" + id);

				var toggle = {play:play, stop:stop};

				send.retrieve.accum({name:"toggle", id:id, data:toggle});

			}, 300);

			$scope.play = function () {

				manager.startInstance(id);
			}


			$scope.stop = function () {

				manager.stopInstance(id, false);
			}

		}
	}

}]);
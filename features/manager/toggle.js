managerModule.directive("toggle", ["manager", 'send',function (manager, send) {

	return {
		scope:false,
		replace:true,
		restrict:'E',
		templateUrl:"features/manager/toggle.html",
		link:function ($scope, element, attr) {

			var name = $scope.info.name;

			setTimeout(function() {

				var play = $("#play" + name);
				var stop = $("#stop" + name);

				var toggle = {play:play, stop:stop};

				send.accum({name:"toggle", id:name, data:toggle});

			}, 300);

			$scope.play = function () {

				manager.startInstance(name);

				// $("#play" + name).addClass("hidden");
				// $("#stop" + name).removeClass("hidden");
			}


			$scope.stop = function () {

				//manager.resetInstance(name);
				manager.stopInstance(name, false);

				// $("#play" + name).removeClass("hidden");
				// $("#stop" + name).addClass("hidden"); 
			}

		}
	}

}]);
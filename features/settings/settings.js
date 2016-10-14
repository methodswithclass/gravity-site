settingsModule.directive("settings", ['states', 'send', 'settings.service', 'utility', function (states, send, settings, g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		templateUrl:"features/settings/settings.html",
		link:function ($scope, element, attr) {


		    $scope.directions = {
		    	x:g.c.xDir,
		    	y:g.c.yDir
		    }

		    $scope.axis = {
		    	x:1,
		    	y:1
		    }
		    
		    var setSwitched = function () {

		    	console.log("set switched");

			    $scope.axis = {
			    	x:(g.getDirection(g.c.xDir)),
			    	y:(g.getDirection(g.c.yDir))
			    }

			}

			$scope.changeDirection = function (dir) {

				console.log("settings set direction", dir, dir == g.c.xDir ? $scope.axis.x : $scope.axis.y);

				g.setDirection(dir, dir == g.c.xDir ? $scope.axis.x : $scope.axis.y);
			}

			setTimeout(function () {

		    	settings.setup.factor();
		    	settings.setup.direction(setSwitched);

		    }, 500);

		}
	}

}]);